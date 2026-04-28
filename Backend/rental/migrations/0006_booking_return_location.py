from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rental", "0005_vehicle_image_url_text"),
    ]

    operations = [
        migrations.AddField(
            model_name="booking",
            name="return_location",
            field=models.CharField(blank=True, default="", max_length=120),
        ),
    ]
