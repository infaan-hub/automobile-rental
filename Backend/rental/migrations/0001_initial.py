from decimal import Decimal

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Vehicle",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120)),
                ("brand", models.CharField(max_length=80)),
                ("model", models.CharField(max_length=80)),
                ("year", models.PositiveIntegerField()),
                (
                    "body_type",
                    models.CharField(
                        choices=[
                            ("sedan", "Sedan"),
                            ("suv", "SUV"),
                            ("van", "Van"),
                            ("pickup", "Pickup"),
                            ("luxury", "Luxury"),
                        ],
                        max_length=20,
                    ),
                ),
                ("seats", models.PositiveIntegerField(default=5)),
                ("transmission", models.CharField(default="Automatic", max_length=40)),
                ("fuel_type", models.CharField(default="Petrol", max_length=40)),
                ("location", models.CharField(default="Main Branch", max_length=120)),
                (
                    "daily_rate",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=10,
                        validators=[django.core.validators.MinValueValidator(Decimal("0.01"))],
                    ),
                ),
                ("image_url", models.URLField(blank=True)),
                ("description", models.TextField(blank=True)),
                ("is_available", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={"ordering": ["name"]},
        ),
        migrations.CreateModel(
            name="Booking",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("customer_name", models.CharField(max_length=120)),
                ("customer_email", models.EmailField(max_length=254)),
                ("customer_phone", models.CharField(max_length=40)),
                ("pickup_date", models.DateField()),
                ("return_date", models.DateField()),
                ("pickup_location", models.CharField(max_length=120)),
                ("notes", models.TextField(blank=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("confirmed", "Confirmed"),
                            ("completed", "Completed"),
                            ("cancelled", "Cancelled"),
                        ],
                        default="pending",
                        max_length=20,
                    ),
                ),
                ("total_cost", models.DecimalField(decimal_places=2, default=Decimal("0.00"), max_digits=10)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "vehicle",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="bookings",
                        to="rental.vehicle",
                    ),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
