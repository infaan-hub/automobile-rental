from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health_check, name="health_check"),
    path("home-content/", views.home_content, name="home_content"),
    path("vehicles/", views.vehicle_list, name="vehicle_list"),
    path("vehicles/<int:vehicle_id>/", views.vehicle_detail, name="vehicle_detail"),
    path("bookings/", views.booking_list_create, name="booking_list_create"),
    path("bookings/<int:booking_id>/", views.booking_detail, name="booking_detail"),
    path("dashboard/", views.dashboard_stats, name="dashboard_stats"),
    path("admin/register/", views.admin_register, name="admin_register"),
    path("admin/login/", views.admin_login, name="admin_login"),
    path("admin/dashboard/", views.admin_dashboard, name="admin_dashboard"),
    path("admin/users/", views.admin_users, name="admin_users"),
    path("admin/users/<int:user_id>/", views.admin_user_detail, name="admin_user_detail"),
    path("car-dealer/login/", views.dealer_login, name="dealer_login"),
    path("car-dealer/dashboard/", views.dealer_dashboard, name="dealer_dashboard"),
    path("car-dealer/car-categories/", views.dealer_car_categories, name="dealer_car_categories"),
    path("car-dealer/car-categories/<int:category_id>/", views.dealer_car_category_detail, name="dealer_car_category_detail"),
    path("car-dealer/scooter-categories/", views.dealer_scooter_categories, name="dealer_scooter_categories"),
    path(
        "car-dealer/scooter-categories/<int:category_id>/",
        views.dealer_scooter_category_detail,
        name="dealer_scooter_category_detail",
    ),
    path("car-dealer/vehicles/", views.dealer_vehicles, name="dealer_vehicles"),
    path("car-dealer/vehicles/<int:vehicle_id>/", views.dealer_vehicle_detail, name="dealer_vehicle_detail"),
]
