from datetime import date
from decimal import Decimal

from django.core.exceptions import ValidationError

from .models import Booking, Vehicle


def vehicle_to_dict(vehicle):
    return {
        "id": vehicle.id,
        "name": vehicle.name,
        "brand": vehicle.brand,
        "model": vehicle.model,
        "year": vehicle.year,
        "bodyType": vehicle.body_type,
        "bodyTypeLabel": vehicle.get_body_type_display(),
        "seats": vehicle.seats,
        "transmission": vehicle.transmission,
        "fuelType": vehicle.fuel_type,
        "location": vehicle.location,
        "dailyRate": float(vehicle.daily_rate),
        "imageUrl": vehicle.image_url,
        "description": vehicle.description,
        "isAvailable": vehicle.is_available,
    }


def booking_to_dict(booking):
    return {
        "id": booking.id,
        "vehicle": vehicle_to_dict(booking.vehicle),
        "customerName": booking.customer_name,
        "customerEmail": booking.customer_email,
        "customerPhone": booking.customer_phone,
        "pickupDate": booking.pickup_date.isoformat(),
        "returnDate": booking.return_date.isoformat(),
        "pickupLocation": booking.pickup_location,
        "notes": booking.notes,
        "status": booking.status,
        "totalCost": float(booking.total_cost),
        "createdAt": booking.created_at.isoformat(),
    }


def validate_booking_payload(payload):
    required = [
        "vehicleId",
        "customerName",
        "customerEmail",
        "customerPhone",
        "pickupDate",
        "returnDate",
        "pickupLocation",
    ]
    missing = [field for field in required if not payload.get(field)]
    if missing:
        raise ValidationError({field: "This field is required." for field in missing})

    try:
        pickup_date = date.fromisoformat(payload["pickupDate"])
        return_date = date.fromisoformat(payload["returnDate"])
    except ValueError as exc:
        raise ValidationError({"dates": "Use ISO date format YYYY-MM-DD."}) from exc

    if return_date <= pickup_date:
        raise ValidationError({"returnDate": "Return date must be after pickup date."})

    vehicle = Vehicle.objects.filter(pk=payload["vehicleId"], is_available=True).first()
    if vehicle is None:
        raise ValidationError({"vehicleId": "Vehicle was not found or is unavailable."})

    overlapping_booking = Booking.objects.filter(
        vehicle=vehicle,
        status__in=["pending", "confirmed"],
        pickup_date__lt=return_date,
        return_date__gt=pickup_date,
    ).exists()
    if overlapping_booking:
        raise ValidationError({"vehicleId": "Vehicle is already booked for those dates."})

    days = (return_date - pickup_date).days
    return {
        "vehicle": vehicle,
        "customer_name": payload["customerName"].strip(),
        "customer_email": payload["customerEmail"].strip(),
        "customer_phone": payload["customerPhone"].strip(),
        "pickup_date": pickup_date,
        "return_date": return_date,
        "pickup_location": payload["pickupLocation"].strip(),
        "notes": payload.get("notes", "").strip(),
        "total_cost": Decimal(days) * vehicle.daily_rate,
    }
