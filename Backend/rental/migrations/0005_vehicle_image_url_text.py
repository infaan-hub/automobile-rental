from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("rental", "0004_category_image_urls"),
    ]

    operations = [
        migrations.AlterField(
            model_name="vehicle",
            name="image_url",
            field=models.TextField(blank=True),
        ),
    ]
