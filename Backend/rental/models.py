from decimal import Decimal

from django.core.validators import MinValueValidator
from django.db import models


class Vehicle(models.Model):
    BODY_TYPES = [
        ("sedan", "Sedan"),
        ("suv", "SUV"),
        ("van", "Van"),
        ("pickup", "Pickup"),
        ("luxury", "Luxury"),
    ]

    name = models.CharField(max_length=120)
    brand = models.CharField(max_length=80)
    model = models.CharField(max_length=80)
    year = models.PositiveIntegerField()
    body_type = models.CharField(max_length=20, choices=BODY_TYPES)
    seats = models.PositiveIntegerField(default=5)
    transmission = models.CharField(max_length=40, default="Automatic")
    fuel_type = models.CharField(max_length=40, default="Petrol")
    location = models.CharField(max_length=120, default="Main Branch")
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))])
    image_url = models.URLField(blank=True)
    description = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
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
