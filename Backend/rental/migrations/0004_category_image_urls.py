from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rental", "0003_userprofile_login_window_datetimes"),
    ]

    operations = [
        migrations.AddField(
            model_name="carcategory",
            name="image_url",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="scootercategory",
            name="image_url",
            field=models.TextField(blank=True),
        ),
    ]
