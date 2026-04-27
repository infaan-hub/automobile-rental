from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rental", "0002_role_category_token_and_vehicle_updates"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="login_end_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="userprofile",
            name="login_start_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
