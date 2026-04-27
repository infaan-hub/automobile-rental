from datetime import date
from decimal import Decimal

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

from .models import Booking, CarCategory, ScooterCategory, UserProfile, Vehicle


def format_datetime_local(value):
    if not value:
        return ""
    return value.strftime("%Y-%m-%dT%H:%M")


def user_profile_to_dict(user):
    profile, _ = UserProfile.objects.get_or_create(
        user=user,
        defaults={"role": "admin" if user.is_superuser else "customer"},
    )
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "firstName": user.first_name,
        "lastName": user.last_name,
        "isSuperuser": user.is_superuser,
        "role": profile.role,
        "loginStartAt": format_datetime_local(profile.login_start_at),
        "loginEndAt": format_datetime_local(profile.login_end_at),
        "loginStartTime": profile.login_start_time.isoformat() if profile.login_start_time else "",
        "loginEndTime": profile.login_end_time.isoformat() if profile.login_end_time else "",
    }


def car_category_to_dict(category):
    return {
        "id": category.id,
        "name": category.name,
        "description": category.description,
        "imageUrl": category.image_url,
        "createdBy": category.created_by.username,
    }


def scooter_category_to_dict(category):
    return {
        "id": category.id,
        "name": category.name,
        "description": category.description,
        "imageUrl": category.image_url,
        "createdBy": category.created_by.username,
    }


def vehicle_to_dict(vehicle):
    return {
        "id": vehicle.id,
        "name": vehicle.name,
        "brand": vehicle.brand,
        "model": vehicle.model,
        "year": vehicle.year,
        "vehicleType": vehicle.vehicle_type,
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
        "isTrending": vehicle.is_trending,
        "dealer": user_profile_to_dict(vehicle.dealer) if vehicle.dealer else None,
        "carCategory": car_category_to_dict(vehicle.car_category) if vehicle.car_category else None,
        "scooterCategory": scooter_category_to_dict(vehicle.scooter_category) if vehicle.scooter_category else None,
    }


def booking_to_dict(booking):
    return {
        "id": booking.id,
        "vehicle": vehicle_to_dict(booking.vehicle),
        "customerUser": user_profile_to_dict(booking.customer_user) if booking.customer_user else None,
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


def ensure_customer_user(name, email):
    username_base = (email.split("@")[0] or "customer").lower().replace(" ", "")
    username = username_base
    suffix = 1
    while User.objects.filter(username=username).exclude(email__iexact=email).exists():
        username = f"{username_base}{suffix}"
        suffix += 1

    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            "username": username,
            "first_name": name.strip(),
        },
    )
    if created:
        user.set_unusable_password()
        user.save()

    profile, _ = UserProfile.objects.get_or_create(user=user, defaults={"role": "customer"})
    if profile.role != "customer" and not user.is_superuser:
        profile.role = "customer"
        profile.save(update_fields=["role"])
    return user


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
    customer_user = ensure_customer_user(payload["customerName"], payload["customerEmail"].strip())
    return {
        "vehicle": vehicle,
        "customer_user": customer_user,
        "customer_name": payload["customerName"].strip(),
        "customer_email": payload["customerEmail"].strip(),
        "customer_phone": payload["customerPhone"].strip(),
        "pickup_date": pickup_date,
        "return_date": return_date,
        "pickup_location": payload["pickupLocation"].strip(),
        "notes": payload.get("notes", "").strip(),
        "total_cost": Decimal(days) * vehicle.daily_rate,
    }
