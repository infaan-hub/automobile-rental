import json
import secrets
from datetime import time

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models import Count, Q, Sum
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import AuthToken, Booking, CarCategory, ScooterCategory, UserProfile, Vehicle
from .serializers import (
    booking_to_dict,
    car_category_to_dict,
    scooter_category_to_dict,
    user_profile_to_dict,
    validate_booking_payload,
    vehicle_to_dict,
)


def parse_json_body(request):
    try:
        return json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        raise ValidationError({"body": "Invalid JSON body."})


def validation_error_response(error):
    return JsonResponse({"errors": error.message_dict if hasattr(error, "message_dict") else error.messages}, status=400)


def error_response(message, status=400):
    return JsonResponse({"error": message}, status=status)


def get_or_create_profile(user):
    return UserProfile.objects.get_or_create(
        user=user,
        defaults={"role": "admin" if user.is_superuser else "customer"},
    )[0]


def create_token(user):
    profile = get_or_create_profile(user)
    if user.is_superuser and profile.role != "admin":
        profile.role = "admin"
        profile.save(update_fields=["role"])
    token = AuthToken.objects.create(user=user, key=secrets.token_hex(32))
    return token


def get_authenticated_user(request):
    authorization = request.headers.get("Authorization", "")
    if not authorization.startswith("Token "):
        return None
    key = authorization.split(" ", 1)[1].strip()
    token = AuthToken.objects.select_related("user").filter(key=key).first()
    return token.user if token else None


def require_role(request, roles):
    user = get_authenticated_user(request)
    if not user:
        return None, error_response("Authentication required.", status=401)
    profile = get_or_create_profile(user)
    effective_role = "admin" if user.is_superuser else profile.role
    if effective_role not in roles:
        return None, error_response("Permission denied.", status=403)
    return user, None


def within_login_window(profile):
    if not profile.login_start_time or not profile.login_end_time:
        return True

    current_time = timezone.localtime().time().replace(second=0, microsecond=0)
    start = profile.login_start_time
    end = profile.login_end_time
    if start <= end:
        return start <= current_time <= end
    return current_time >= start or current_time <= end


def parse_time_value(value, field):
    if not value:
        return None
    try:
        hour, minute = value.split(":", 1)
        return time(hour=int(hour), minute=int(minute))
    except (ValueError, AttributeError):
        raise ValidationError({field: "Use HH:MM format."})


def parse_bool(value, default=False):
    if isinstance(value, bool):
        return value
    if value in ["true", "True", "1", 1]:
        return True
    if value in ["false", "False", "0", 0]:
        return False
    return default


def build_vehicle_payload(payload, user, vehicle=None):
    required = ["name", "brand", "model", "year", "bodyType", "dailyRate"]
    if vehicle is None:
        missing = [field for field in required if payload.get(field) in [None, ""]]
        if missing:
            raise ValidationError({field: "This field is required." for field in missing})

    body_type = payload.get("bodyType", vehicle.body_type if vehicle else "sedan")
    vehicle_type = payload.get("vehicleType", vehicle.vehicle_type if vehicle else "car")

    car_category = None
    scooter_category = None
    car_category_id = payload.get("carCategoryId")
    scooter_category_id = payload.get("scooterCategoryId")
    if car_category_id:
        car_category = CarCategory.objects.filter(pk=car_category_id).first()
        if not car_category:
            raise ValidationError({"carCategoryId": "Car category not found."})
    if scooter_category_id:
        scooter_category = ScooterCategory.objects.filter(pk=scooter_category_id).first()
        if not scooter_category:
            raise ValidationError({"scooterCategoryId": "Scooter category not found."})

    return {
        "dealer": user,
        "name": payload.get("name", vehicle.name if vehicle else "").strip(),
        "brand": payload.get("brand", vehicle.brand if vehicle else "").strip(),
        "model": payload.get("model", vehicle.model if vehicle else "").strip(),
        "year": int(payload.get("year", vehicle.year if vehicle else timezone.now().year)),
        "vehicle_type": vehicle_type,
        "body_type": body_type,
        "car_category": car_category if car_category_id is not None else (vehicle.car_category if vehicle else None),
        "scooter_category": (
            scooter_category if scooter_category_id is not None else (vehicle.scooter_category if vehicle else None)
        ),
        "seats": int(payload.get("seats", vehicle.seats if vehicle else 2)),
        "transmission": payload.get("transmission", vehicle.transmission if vehicle else "Automatic").strip(),
        "fuel_type": payload.get("fuelType", vehicle.fuel_type if vehicle else "Electric").strip(),
        "location": payload.get("location", vehicle.location if vehicle else "Main Branch").strip(),
        "daily_rate": payload.get("dailyRate", vehicle.daily_rate if vehicle else "0"),
        "image_url": payload.get("imageUrl", vehicle.image_url if vehicle else "").strip(),
        "description": payload.get("description", vehicle.description if vehicle else "").strip(),
        "is_available": parse_bool(payload.get("isAvailable", vehicle.is_available if vehicle else True), True),
        "is_trending": parse_bool(payload.get("isTrending", vehicle.is_trending if vehicle else False), False),
    }


@require_http_methods(["GET"])
def health_check(request):
    return JsonResponse({"status": "ok", "service": "automobile-rental-api"})


@require_http_methods(["GET"])
def vehicle_list(request):
    vehicles = Vehicle.objects.select_related("dealer", "car_category", "scooter_category").all()
    body_type = request.GET.get("bodyType")
    search = request.GET.get("search")
    available = request.GET.get("available")
    vehicle_type = request.GET.get("vehicleType")
    trending = request.GET.get("trending")

    if body_type and body_type != "all":
        vehicles = vehicles.filter(body_type=body_type)
    if vehicle_type and vehicle_type != "all":
        vehicles = vehicles.filter(vehicle_type=vehicle_type)
    if search:
        vehicles = vehicles.filter(
            Q(name__icontains=search)
            | Q(brand__icontains=search)
            | Q(model__icontains=search)
            | Q(location__icontains=search)
        )
    if available in ["true", "false"]:
        vehicles = vehicles.filter(is_available=available == "true")
    if trending in ["true", "false"]:
        vehicles = vehicles.filter(is_trending=trending == "true")

    return JsonResponse({"vehicles": [vehicle_to_dict(vehicle) for vehicle in vehicles]})


@require_http_methods(["GET"])
def vehicle_detail(request, vehicle_id):
    vehicle = Vehicle.objects.select_related("dealer", "car_category", "scooter_category").filter(pk=vehicle_id).first()
    if vehicle is None:
        return JsonResponse({"error": "Vehicle not found."}, status=404)
    return JsonResponse({"vehicle": vehicle_to_dict(vehicle)})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def booking_list_create(request):
    if request.method == "GET":
        email = request.GET.get("email")
        bookings = Booking.objects.select_related("vehicle", "customer_user").all()
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
    booking = Booking.objects.select_related("vehicle", "customer_user").filter(pk=booking_id).first()
    if booking is None:
        return JsonResponse({"error": "Booking not found."}, status=404)

    if request.method == "GET":
        return JsonResponse({"booking": booking_to_dict(booking)})

    user, error = require_role(request, ["admin", "dealer"])
    if error:
        return error
    if not user.is_superuser and booking.vehicle.dealer_id != user.id:
        return error_response("Permission denied.", status=403)

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


@csrf_exempt
@require_http_methods(["POST"])
def admin_register(request):
    existing_superuser = User.objects.filter(is_superuser=True).exists()
    requester = get_authenticated_user(request)
    if existing_superuser and (not requester or not requester.is_superuser):
        return error_response("Admin registration is disabled because a superuser already exists.", status=403)

    try:
        payload = parse_json_body(request)
    except ValidationError as error:
        return validation_error_response(error)

    required = ["username", "email", "password"]
    missing = [field for field in required if not payload.get(field)]
    if missing:
        return JsonResponse({"errors": {field: "This field is required." for field in missing}}, status=400)
    if User.objects.filter(username=payload["username"]).exists():
        return JsonResponse({"errors": {"username": "Username already exists."}}, status=400)

    user = User.objects.create_superuser(
        username=payload["username"].strip(),
        email=payload["email"].strip(),
        password=payload["password"],
        first_name=payload.get("firstName", "").strip(),
        last_name=payload.get("lastName", "").strip(),
    )
    profile = get_or_create_profile(user)
    profile.role = "admin"
    profile.save(update_fields=["role"])
    token = create_token(user)
    return JsonResponse({"token": token.key, "user": user_profile_to_dict(user)}, status=201)


@csrf_exempt
@require_http_methods(["POST"])
def admin_login(request):
    try:
        payload = parse_json_body(request)
    except ValidationError as error:
        return validation_error_response(error)

    username = (payload.get("username") or "").strip()
    password = payload.get("password", "")
    email = (payload.get("email") or "").strip()

    if email and not username:
        username = User.objects.filter(email__iexact=email).values_list("username", flat=True).first() or ""

    user = authenticate(username=username, password=password)
    if not user:
        return error_response("Invalid admin credentials.", status=401)

    profile = get_or_create_profile(user)
    if not user.is_superuser and profile.role != "admin":
        return error_response("Invalid admin credentials.", status=401)

    token = create_token(user)
    return JsonResponse({"token": token.key, "user": user_profile_to_dict(user)})


@require_http_methods(["GET"])
def admin_dashboard(request):
    user, error = require_role(request, ["admin"])
    if error:
        return error

    dealers = UserProfile.objects.filter(role="dealer").count()
    customers = UserProfile.objects.filter(role="customer").count()
    stats = Booking.objects.aggregate(
        totalBookings=Count("id"),
        rentedCars=Count("id", filter=Q(status__in=["confirmed", "completed"])),
        revenue=Sum("total_cost"),
    )
    users = User.objects.select_related("profile").order_by("-date_joined")
    bookings = Booking.objects.select_related("vehicle", "customer_user")[:10]
    return JsonResponse(
        {
            "user": user_profile_to_dict(user),
            "stats": {
                "totalUsers": users.count(),
                "dealers": dealers,
                "customers": customers,
                "vehicles": Vehicle.objects.count(),
                "bookings": stats["totalBookings"] or 0,
                "rentedCars": stats["rentedCars"] or 0,
                "revenue": float(stats["revenue"] or 0),
            },
            "users": [user_profile_to_dict(entry) for entry in users],
            "bookings": [booking_to_dict(booking) for booking in bookings],
        }
    )


@csrf_exempt
@require_http_methods(["GET", "POST"])
def admin_users(request):
    user, error = require_role(request, ["admin"])
    if error:
        return error

    if request.method == "GET":
        users = User.objects.select_related("profile").order_by("-date_joined")
        return JsonResponse({"users": [user_profile_to_dict(entry) for entry in users]})

    try:
        payload = parse_json_body(request)
        required = ["username", "email", "password"]
        missing = [field for field in required if not payload.get(field)]
        if missing:
            raise ValidationError({field: "This field is required." for field in missing})
    except ValidationError as error:
        return validation_error_response(error)

    if User.objects.filter(username=payload["username"]).exists():
        return JsonResponse({"errors": {"username": "Username already exists."}}, status=400)

    new_user = User.objects.create_user(
        username=payload["username"].strip(),
        email=payload["email"].strip(),
        password=payload["password"],
        first_name=payload.get("firstName", "").strip(),
        last_name=payload.get("lastName", "").strip(),
    )
    profile = get_or_create_profile(new_user)
    profile.role = "dealer"
    try:
        profile.login_start_time = parse_time_value(payload.get("loginStartTime"), "loginStartTime")
        profile.login_end_time = parse_time_value(payload.get("loginEndTime"), "loginEndTime")
    except ValidationError as error:
        new_user.delete()
        return validation_error_response(error)
    profile.save()
    return JsonResponse({"user": user_profile_to_dict(new_user)}, status=201)


@csrf_exempt
@require_http_methods(["DELETE"])
def admin_user_detail(request, user_id):
    current_user, error = require_role(request, ["admin"])
    if error:
        return error

    target = User.objects.filter(pk=user_id).first()
    if not target:
        return error_response("User not found.", status=404)
    if target.id == current_user.id:
        return error_response("You cannot delete the currently logged-in admin.", status=400)

    target.delete()
    return JsonResponse({"success": True})


@csrf_exempt
@require_http_methods(["POST"])
def dealer_login(request):
    try:
        payload = parse_json_body(request)
    except ValidationError as error:
        return validation_error_response(error)

    user = authenticate(username=payload.get("username", ""), password=payload.get("password", ""))
    if not user:
        return error_response("Invalid dealer credentials.", status=401)
    profile = get_or_create_profile(user)
    if profile.role != "dealer":
        return error_response("This account is not a car dealer account.", status=403)
    if not within_login_window(profile):
        return error_response("Dealer login is outside the scheduled access time.", status=403)

    token = create_token(user)
    return JsonResponse({"token": token.key, "user": user_profile_to_dict(user)})


@require_http_methods(["GET"])
def dealer_dashboard(request):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    vehicles = Vehicle.objects.select_related("car_category", "scooter_category").filter(dealer=user)
    bookings = Booking.objects.select_related("vehicle", "customer_user").filter(vehicle__dealer=user)
    return JsonResponse(
        {
            "user": user_profile_to_dict(user),
            "stats": {
                "vehicles": vehicles.count(),
                "trendingVehicles": vehicles.filter(is_trending=True).count(),
                "bookings": bookings.count(),
                "rentedCars": bookings.filter(status__in=["confirmed", "completed"]).count(),
            },
            "carCategories": [car_category_to_dict(category) for category in CarCategory.objects.filter(created_by=user)],
            "scooterCategories": [
                scooter_category_to_dict(category) for category in ScooterCategory.objects.filter(created_by=user)
            ],
            "vehicles": [vehicle_to_dict(vehicle) for vehicle in vehicles],
            "bookings": [booking_to_dict(booking) for booking in bookings[:50]],
        }
    )


@csrf_exempt
@require_http_methods(["GET", "POST"])
def dealer_car_categories(request):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    if request.method == "GET":
        categories = CarCategory.objects.filter(created_by=user)
        return JsonResponse({"carCategories": [car_category_to_dict(category) for category in categories]})

    try:
        payload = parse_json_body(request)
        if not payload.get("name"):
            raise ValidationError({"name": "This field is required."})
    except ValidationError as error:
        return validation_error_response(error)

    category = CarCategory.objects.create(
        name=payload["name"].strip(),
        description=payload.get("description", "").strip(),
        created_by=user,
    )
    return JsonResponse({"carCategory": car_category_to_dict(category)}, status=201)


@csrf_exempt
@require_http_methods(["PATCH", "DELETE"])
def dealer_car_category_detail(request, category_id):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    category = CarCategory.objects.filter(pk=category_id, created_by=user).first()
    if not category:
        return error_response("Car category not found.", status=404)

    if request.method == "DELETE":
        category.delete()
        return JsonResponse({"success": True})

    try:
        payload = parse_json_body(request)
    except ValidationError as error:
        return validation_error_response(error)

    category.name = payload.get("name", category.name).strip()
    category.description = payload.get("description", category.description).strip()
    category.save()
    return JsonResponse({"carCategory": car_category_to_dict(category)})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def dealer_scooter_categories(request):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    if request.method == "GET":
        categories = ScooterCategory.objects.filter(created_by=user)
        return JsonResponse({"scooterCategories": [scooter_category_to_dict(category) for category in categories]})

    try:
        payload = parse_json_body(request)
        if not payload.get("name"):
            raise ValidationError({"name": "This field is required."})
    except ValidationError as error:
        return validation_error_response(error)

    category = ScooterCategory.objects.create(
        name=payload["name"].strip(),
        description=payload.get("description", "").strip(),
        created_by=user,
    )
    return JsonResponse({"scooterCategory": scooter_category_to_dict(category)}, status=201)


@csrf_exempt
@require_http_methods(["PATCH", "DELETE"])
def dealer_scooter_category_detail(request, category_id):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    category = ScooterCategory.objects.filter(pk=category_id, created_by=user).first()
    if not category:
        return error_response("Scooter category not found.", status=404)

    if request.method == "DELETE":
        category.delete()
        return JsonResponse({"success": True})

    try:
        payload = parse_json_body(request)
    except ValidationError as error:
        return validation_error_response(error)

    category.name = payload.get("name", category.name).strip()
    category.description = payload.get("description", category.description).strip()
    category.save()
    return JsonResponse({"scooterCategory": scooter_category_to_dict(category)})


@csrf_exempt
@require_http_methods(["GET", "POST"])
def dealer_vehicles(request):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    if request.method == "GET":
        vehicles = Vehicle.objects.select_related("dealer", "car_category", "scooter_category").filter(dealer=user)
        return JsonResponse({"vehicles": [vehicle_to_dict(vehicle) for vehicle in vehicles]})

    try:
        payload = parse_json_body(request)
        vehicle_data = build_vehicle_payload(payload, user)
    except ValidationError as error:
        return validation_error_response(error)

    vehicle = Vehicle.objects.create(**vehicle_data)
    return JsonResponse({"vehicle": vehicle_to_dict(vehicle)}, status=201)


@csrf_exempt
@require_http_methods(["PATCH", "DELETE"])
def dealer_vehicle_detail(request, vehicle_id):
    user, error = require_role(request, ["dealer"])
    if error:
        return error

    vehicle = Vehicle.objects.select_related("dealer", "car_category", "scooter_category").filter(pk=vehicle_id, dealer=user).first()
    if not vehicle:
        return error_response("Vehicle not found.", status=404)

    if request.method == "DELETE":
        vehicle.delete()
        return JsonResponse({"success": True})

    try:
        payload = parse_json_body(request)
        vehicle_data = build_vehicle_payload(payload, user, vehicle=vehicle)
    except ValidationError as error:
        return validation_error_response(error)

    for field, value in vehicle_data.items():
        setattr(vehicle, field, value)
    vehicle.save()
    return JsonResponse({"vehicle": vehicle_to_dict(vehicle)})
