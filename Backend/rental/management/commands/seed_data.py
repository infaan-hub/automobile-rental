from django.core.management.base import BaseCommand

from rental.models import Vehicle


class Command(BaseCommand):
    help = "Seed the database with sample rental vehicles."

    def handle(self, *args, **options):
        vehicles = [
            {
                "name": "City Glide",
                "brand": "Toyota",
                "model": "Corolla",
                "year": 2023,
                "body_type": "sedan",
                "seats": 5,
                "transmission": "Automatic",
                "fuel_type": "Petrol",
                "location": "Downtown Branch",
                "daily_rate": "55.00",
                "image_url": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
                "description": "Reliable, fuel-efficient sedan for daily trips and business errands.",
            },
            {
                "name": "Safari Max",
                "brand": "Toyota",
                "model": "Land Cruiser Prado",
                "year": 2022,
                "body_type": "suv",
                "seats": 7,
                "transmission": "Automatic",
                "fuel_type": "Diesel",
                "location": "Airport Branch",
                "daily_rate": "120.00",
                "image_url": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
                "description": "Powerful SUV built for airport transfers, family travel, and rough roads.",
            },
            {
                "name": "Executive Pulse",
                "brand": "Mercedes-Benz",
                "model": "E-Class",
                "year": 2024,
                "body_type": "luxury",
                "seats": 5,
                "transmission": "Automatic",
                "fuel_type": "Hybrid",
                "location": "Hotel District",
                "daily_rate": "180.00",
                "image_url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
                "description": "Premium comfort for VIP transfers, weddings, and corporate events.",
            },
            {
                "name": "Crew Mover",
                "brand": "Nissan",
                "model": "NV350",
                "year": 2021,
                "body_type": "van",
                "seats": 12,
                "transmission": "Manual",
                "fuel_type": "Diesel",
                "location": "Main Branch",
                "daily_rate": "95.00",
                "image_url": "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
                "description": "Spacious van for groups, tours, school runs, and team logistics.",
            },
            {
                "name": "Load Runner",
                "brand": "Ford",
                "model": "Ranger",
                "year": 2023,
                "body_type": "pickup",
                "seats": 5,
                "transmission": "Automatic",
                "fuel_type": "Diesel",
                "location": "Industrial Area",
                "daily_rate": "85.00",
                "image_url": "https://images.unsplash.com/photo-1594919646096-ec39b206fd9f?auto=format&fit=crop&w=1200&q=80",
                "description": "Flexible pickup for field work, light cargo, and weekend adventures.",
            },
        ]

        created = 0
        for data in vehicles:
            _, was_created = Vehicle.objects.get_or_create(name=data["name"], defaults=data)
            created += int(was_created)

        self.stdout.write(self.style.SUCCESS(f"Seed complete. Created {created} vehicles."))
