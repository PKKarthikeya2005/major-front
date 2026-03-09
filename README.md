# ChitraSetu | Cinematic Photography

Welcome to the official repository for **ChitraSetu**! 

This project is a modern, unified web application featuring a stunning, responsive **React (Vite) Frontend** and a robust, production-ready **Django Backend**. The entire application is designed to be served from a single Django instance using industry-standard configurations.

---

## 🚀 Architecture Overview

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Django 5.0, Python 3.11+
- **Database:** MySQL
- **Static File Serving:** WhiteNoise (Compressed Manifest Storage)
- **Deployment:** Gunicorn (WSGI Server)

In production, the compiled React frontend is served as static files dynamically through a Django catch-all route, decoupling API logic while maintaining a single domain and command structure.

---

## 🛠️ Local Development Setup

### 1. Requirements
Ensure you have the following installed on your machine:
- Node.js & npm (v18+)
- Python (v3.10+)
- MySQL Server

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd <repository-directory>
```

### 3. Frontend Setup
Install the necessary Node dependencies and build the static delivery assets:
```bash
# Install React dependencies
npm install

# Compile the production React build into the /dist folder
npm run build
```
*(Alternatively, you can run `npm run dev` in a separate terminal if you want hot-reloading for frontend work).*

### 4. Backend Setup
Set up your Python environment and dependencies:
```bash
# It is recommended to create a virtual environment first
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install Django and production requirements
pip install -r requirements.txt
```

### 5. Environment Variables (.env)
Create a `.env` file in the root directory (where `manage.py` is located) and configure your local MySQL credentials:

```ini
# Core
SECRET_KEY=generate_a_secure_random_string_here
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

# Database
DB_NAME=chitra_setu_db
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306

# Security Options (Set to True in production!)
SECURE_SSL_REDIRECT=False
SESSION_COOKIE_SECURE=False
CSRF_COOKIE_SECURE=False
```

### 6. Database Initialization
Ensure your MySQL server is running, then create the database and apply the Django schemas:
```bash
# Log into your local MySQL CLI or Workbench and run:
CREATE DATABASE chitra_setu_db;

# Run the Django migrations to build tables
python manage.py migrate
```

### 7. Run the Application!
Start the unified Django server:
```bash
python manage.py runserver
```
Visit `http://localhost:8000/` in your browser. You will see the React application, cleanly served by Django!

---

## 🔒 Production Deployment Notes

This repository is optimized for deployment on VPS or PAAS platforms (AWS, DigitalOcean, Render).

1. **Security:** Ensure `DEBUG=False` in your production `.env` file and strictly set your `ALLOWED_HOSTS`. All `SECURE_` and `COOKIE_` environment variables must be set to `True` if using HTTPS.
2. **Static Files:** Before spinning up the server, you must run `python manage.py collectstatic` to allow WhiteNoise to compress and hash the React build assets.
3. **Web Server:** Do not use `runserver` in production. Boot the application using Gunicorn:
   ```bash
   gunicorn backend.wsgi:application --bind 0.0.0.0:8000
   ```

---
*Developed by the Chitra Setu Team.*
