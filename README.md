# Automobile Rental

A full-stack automobile rental system with a Django JSON API backend and a React/Vite frontend.

## Features

- Vehicle catalogue with search and body-type filtering.
- Booking creation with customer details, pickup dates, return dates, and automatic total cost calculation.
- Booking overlap validation so the same vehicle cannot be reserved for conflicting dates.
- Booking status management for pending, confirmed, completed, and cancelled rentals.
- Dashboard metrics for fleet size, availability, active bookings, and revenue.
- Django admin for managing vehicles and bookings directly.

## Project Structure

```text
Backend/
  automobile_rental/   Django project settings and URLs
  rental/              Vehicles, bookings, API views, migrations, seed command
  manage.py
  requirements.txt

Frontend/
  src/                 React application and styling
  package.json
  vite.config.js
```

## Backend Setup

From the repository root:

```powershell
python -m venv myvenv
.\myvenv\Scripts\activate
pip install -r Backend\requirements.txt
cd Backend
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

If you already keep `myvenv` outside the project folder, activate that environment instead and run the same `pip install`, `migrate`, `seed_data`, and `runserver` commands.

Backend endpoints:

- `GET http://127.0.0.1:8000/api/health/`
- `GET http://127.0.0.1:8000/api/vehicles/`
- `GET http://127.0.0.1:8000/api/vehicles/<id>/`
- `GET http://127.0.0.1:8000/api/bookings/`
- `POST http://127.0.0.1:8000/api/bookings/`
- `PATCH http://127.0.0.1:8000/api/bookings/<id>/`
- `GET http://127.0.0.1:8000/api/dashboard/`

## Frontend Setup

Open a second terminal from the repository root:

```powershell
cd Frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://127.0.0.1:5173
```

Frontend routes:

- `/home`
- `/admin/register`
- `/admin/login`
- `/admin/dashboard`
- `/car-dealer/login`
- `/car-dealer/dashboard`

The deployed API base URL is `https://automobile-rental.onrender.com/api`. For local development, you can use `http://127.0.0.1:8000/api`. To override it, create `Frontend/.env`:

```text
VITE_API_BASE_URL=https://automobile-rental.onrender.com/api
```

## Admin

After creating a superuser, open:

```text
http://127.0.0.1:8000/admin/
```

Use the admin panel to add, update, or remove vehicles and review bookings.

## Render Backend Deploy

If your Render service root directory is the repository root, use:

```text
Build Command:
pip install -r requirements.txt && python Backend/manage.py collectstatic --noinput

Start Command:
gunicorn automobile_rental.wsgi:application --chdir Backend --bind 0.0.0.0:$PORT
```

Recommended Render environment variables:

```text
SECRET_KEY=your-secure-secret-key
DEBUG=False
DATABASE_URL=postgresql://neondb_owner:npg_dOjzkHv19Xix@ep-aged-mode-a492izde-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
ALLOWED_HOSTS=.onrender.com,127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.onrender.com,http://localhost:5173,http://127.0.0.1:5173
```

Run migrations from Render Shell after the first deploy:

```text
python Backend/manage.py migrate
python Backend/manage.py seed_data
python Backend/manage.py createsuperuser
```

If you set Render's root directory to `Backend`, use this instead:

```text
Build Command:
pip install -r requirements.txt && python manage.py collectstatic --noinput

Start Command:
gunicorn automobile_rental.wsgi:application --bind 0.0.0.0:$PORT
```
