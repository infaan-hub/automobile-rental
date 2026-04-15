from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health_check, name="health_check"),
    path("vehicles/", views.vehicle_list, name="vehicle_list"),
    path("vehicles/<int:vehicle_id>/", views.vehicle_detail, name="vehicle_detail"),
    path("bookings/", views.booking_list_create, name="booking_list_create"),
    path("bookings/<int:booking_id>/", views.booking_detail, name="booking_detail"),
    path("dashboard/", views.dashboard_stats, name="dashboard_stats"),
]
