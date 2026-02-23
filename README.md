#  Fashion Store – Full Stack E-commerce Website

A modern full-stack e-commerce web application built using React and Django REST Framework.

#  Tech Stack

1. React (Frontend)
2. Django
3. Django REST Framework
4. JWT Authentication
5. SQLite (Database)
6. CSS / Modern UI Animations

# Features

# Authentication
- User Registration
- Secure Login using JWT
- Protected API routes

# Product Management
- Category-based layout (Men, Women, Kids)
- Subcategory sections (No dropdown – modern layout like H&M)
- Dynamic product images from backend
- Trending categories below hero section
- Responsive product cards

# Cart Functionality
- Add to Cart
- Remove from Cart
- Update quantity
- Dynamic total calculation
- Cart data stored per authenticated user

#  Wishlist
- Add to Wishlist
- Remove from Wishlist
- Dedicated wishlist button with icon

# UI Features
- Modern animated navbar
- Smooth fade animations
- Button hover effects
- Auto sliding hero banner
- Trending categories section
- Responsive design for all screen sizes
- Animated login page

## 📁 Project Structure

fashion-store/
│
├── backend/ # Django Backend
│ ├── manage.py
│ ├── requirements.txt
│ └── ...
│
├── frontend/ # React Frontend
│ ├── package.json
│ ├── src/
│ └── ...
│
└── README.md


## ⚙️ Backend Setup (Django)

cd backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend runs at:
http://127.0.0.1:8000

⚛️ Frontend Setup (React)

cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173
