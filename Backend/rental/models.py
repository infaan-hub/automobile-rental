from decimal import Decimal

from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("dealer", "Car Dealer"),
        ("customer", "Customer"),
    ]

    user = models.OneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="customer")
    login_start_at = models.DateTimeField(blank=True, null=True)
    login_end_at = models.DateTimeField(blank=True, null=True)
    login_start_time = models.TimeField(blank=True, null=True)
    login_end_time = models.TimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} ({self.role})"


class AuthToken(models.Model):
    user = models.ForeignKey(User, related_name="auth_tokens", on_delete=models.CASCADE)
    key = models.CharField(max_length=64, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token for {self.user.username}"


class CarCategory(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    created_by = models.ForeignKey(User, related_name="car_categories", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class ScooterCategory(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    image_url = models.TextField(blank=True)
    created_by = models.ForeignKey(User, related_name="scooter_categories", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Vehicle(models.Model):
    BODY_TYPES = [
        ("sedan", "Sedan"),
        ("suv", "SUV"),
        ("van", "Van"),
        ("pickup", "Pickup"),
        ("luxury", "Luxury"),
    ]
    VEHICLE_TYPES = [
        ("car", "Car"),
        ("scooter", "Scooter"),
    ]

    name = models.CharField(max_length=120)
    brand = models.CharField(max_length=80)
    model = models.CharField(max_length=80)
    year = models.PositiveIntegerField()
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPES, default="car")
    body_type = models.CharField(max_length=20, choices=BODY_TYPES)
    dealer = models.ForeignKey(User, related_name="vehicles", on_delete=models.SET_NULL, blank=True, null=True)
    car_category = models.ForeignKey("CarCategory", related_name="vehicles", on_delete=models.SET_NULL, blank=True, null=True)
    scooter_category = models.ForeignKey(
        "ScooterCategory", related_name="vehicles", on_delete=models.SET_NULL, blank=True, null=True
    )
    seats = models.PositiveIntegerField(default=5)
    transmission = models.CharField(max_length=40, default="Automatic")
    fuel_type = models.CharField(max_length=40, default="Petrol")
    location = models.CharField(max_length=120, default="Main Branch")
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))])
    image_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
    is_trending = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.year} {self.brand} {self.model}"


class Booking(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    vehicle = models.ForeignKey(Vehicle, related_name="bookings", on_delete=models.PROTECT)
    customer_user = models.ForeignKey(User, related_name="bookings", on_delete=models.SET_NULL, blank=True, null=True)
    customer_name = models.CharField(max_length=120)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=40)
    pickup_date = models.DateField()
    return_date = models.DateField()
    pickup_location = models.CharField(max_length=120)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    total_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Booking #{self.pk} - {self.customer_name}"
