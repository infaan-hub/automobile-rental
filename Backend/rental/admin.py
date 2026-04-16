from django.contrib import admin

from .models import AuthToken, Booking, CarCategory, ScooterCategory, UserProfile, Vehicle


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "role", "login_start_time", "login_end_time")
    list_filter = ("role",)
    search_fields = ("user__username", "user__email")


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "key", "created_at")
    search_fields = ("user__username", "key")


@admin.register(CarCategory)
class CarCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_by", "created_at")
    search_fields = ("name",)


@admin.register(ScooterCategory)
class ScooterCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "created_by", "created_at")
    search_fields = ("name",)


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ("name", "vehicle_type", "brand", "model", "year", "body_type", "daily_rate", "is_available", "is_trending")
    list_filter = ("vehicle_type", "body_type", "is_available", "transmission", "is_trending")
    search_fields = ("name", "brand", "model", "location")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "vehicle", "pickup_date", "return_date", "status", "total_cost", "customer_user")
    list_filter = ("status", "pickup_date")
    search_fields = ("customer_name", "customer_email", "customer_phone", "vehicle__name")
