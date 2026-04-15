from django.contrib import admin

from .models import Booking, Vehicle


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("name", "brand", "model", "year", "body_type", "daily_rate", "is_available")
    list_filter = ("body_type", "is_available", "transmission")
    search_fields = ("name", "brand", "model", "location")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "vehicle", "pickup_date", "return_date", "status", "total_cost")
    list_filter = ("status", "pickup_date")
    search_fields = ("customer_name", "customer_email", "customer_phone", "vehicle__name")
