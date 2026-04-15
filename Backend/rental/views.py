import json

from django.core.exceptions import ValidationError
from django.db.models import Count, Q, Sum
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Booking, Vehicle
from .serializers import booking_to_dict, validate_booking_payload, vehicle_to_dict


def parse_json_body(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        raise ValidationError({"body": "Invalid JSON body."})


def validation_error_response(error):
    return JsonResponse({"errors": error.message_dict if hasattr(error, "message_dict") else error.messages}, status=400)


@require_http_methods(["GET"])
def health_check(request):
    return JsonResponse({"status": "ok", "service": "automobile-rental-api"})


@require_http_methods(["GET"])
def vehicle_list(request):
    vehicles = Vehicle.objects.all()
    body_type = request.GET.get("bodyType")
    search = request.GET.get("search")
    available = request.GET.get("available")

    if body_type and body_type != "all":
        vehicles = vehicles.filter(body_type=body_type)
    if search:
        vehicles = vehicles.filter(
            Q(name__icontains=search)
            | Q(brand__icontains=search)
            | Q(model__icontains=search)
            | Q(location__icontains=search)
        )
    if available in ["true", "false"]:
        vehicles = vehicles.filter(is_available=available == "true")

    return JsonResponse({"vehicles": [vehicle_to_dict(vehicle) for vehicle in vehicles]})


@require_http_methods(["GET"])
def vehicle_detail(request, vehicle_id):
    vehicle = Vehicle.objects.filter(pk=vehicle_id).first()
    if vehicle is None:
        return JsonResponse({"error": "Vehicle not found."}, status=404)
    return JsonResponse({"vehicle": vehicle_to_dict(vehicle)})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def booking_list_create(request):
    if request.method == "GET":
        email = request.GET.get("email")
        bookings = Booking.objects.select_related("vehicle")
        if email:
            bookings = bookings.filter(customer_email__iexact=email)
        return JsonResponse({"bookings": [booking_to_dict(booking) for booking in bookings]})

    try:
        payload = parse_json_body(request)
        booking_data = validate_booking_payload(payload)
    except ValidationError as error:
        return validation_error_response(error)

    booking = Booking.objects.create(**booking_data)
    return JsonResponse({"booking": booking_to_dict(booking)}, status=201)


@csrf_exempt
@require_http_methods(["GET", "PATCH"])
def booking_detail(request, booking_id):
    booking = Booking.objects.select_related("vehicle").filter(pk=booking_id).first()
    if booking is None:
        return JsonResponse({"error": "Booking not found."}, status=404)

    if request.method == "GET":
        return JsonResponse({"booking": booking_to_dict(booking)})

    try:
        payload = parse_json_body(request)
    except ValidationError as error:
        return validation_error_response(error)

    status = payload.get("status")
    valid_statuses = [choice[0] for choice in Booking.STATUS_CHOICES]
    if status not in valid_statuses:
        return JsonResponse({"errors": {"status": f"Status must be one of: {', '.join(valid_statuses)}."}}, status=400)

    booking.status = status
    booking.save(update_fields=["status", "updated_at"])
    return JsonResponse({"booking": booking_to_dict(booking)})


@require_http_methods(["GET"])
def dashboard_stats(request):
    stats = Booking.objects.aggregate(
        totalBookings=Count("id"),
        activeBookings=Count("id", filter=Q(status__in=["pending", "confirmed"])),
        revenue=Sum("total_cost", filter=Q(status__in=["confirmed", "completed"])),
    )
    vehicle_count = Vehicle.objects.count()
    available_count = Vehicle.objects.filter(is_available=True).count()

    return JsonResponse(
        {
            "stats": {
                "totalVehicles": vehicle_count,
                "availableVehicles": available_count,
                "totalBookings": stats["totalBookings"] or 0,
                "activeBookings": stats["activeBookings"] or 0,
                "revenue": float(stats["revenue"] or 0),
            }
        }
    )
