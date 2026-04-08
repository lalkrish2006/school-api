# 🏫 EduTrack - School Management System

A production-ready full-stack application for managing and locating schools based on geographical proximity. 
Built as an internship assignment with strict clean architecture and professional engineering standards.

## 🚀 Key Features

*   **Add Schools:** Safely add a new school with precise latitude and longitude validation.
*   **Proximity Search:** Find schools sorted specifically by their distance to a user's location via the Haversine formula distance calculation.
*   **Polished UI:** Glassmorphism aesthetic with a pure Vanilla CSS custom design system ensuring the application feels extremely responsive and clean.
*   **Robust Backend:** Express.js + MySQL connection pool setup utilizing async/await, centralized error handling, and structured JSON responses.

---

## 📂 Project Structure

A clean, clear separation of concerns distinguishing the backend logic from the frontend UI.

```
school-management/
│
├── backend/                  # Node.js + Express Backend
│   ├── config/               # Database connection logic (mysql2/promise)
│   ├── controllers/          # Business logic and request handling
│   ├── middleware/           # Centralized global error handling
│   ├── routes/               # API endpoint definitions
│   ├── scripts/              # Database initialization scripts
│   ├── utils/                # Pure utility functions (Haversine distance)
│   ├── app.js                # Express Server Setup
│   └── package.json          
│
├── frontend/                 # Vite + React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI Blocks (AddSchool, SearchSchools)
│   │   ├── services/         # Axios API connection logic
│   │   ├── index.css         # Premium Design System (CSS Variables + Dynamic Animations)
│   │   └── App.jsx           # Main application shell with tabs
│   └── package.json
│
└── README.md                 # You are here!
```

---

## 🛠️ Installation & Setup

### 1. Database Setup

Ensure you have MySQL installed and running. Create a copy of `.env.example` in the `backend/` directory and rename it to `.env`. Fill in your MySQL credentials.

```bash
cd backend
npm install
node scripts/initDB.js   # Automatically creates 'schooldb' and 'schools' table
```

### 2. Run the Backend

```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

### 3. Run the Frontend

In a new terminal window:

```bash
cd frontend
npm install
npm run dev
# Vite will launch the frontend on http://localhost:5173
```

---

## 🌐 API Documentation

### 1. Add School
**`POST /api/addSchool`**

**Request Body:**
```json
{
  "name": "Springfield High School",
  "address": "123 Education Lane",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Springfield High School",
    "address": "123 Education Lane",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

### 2. List Schools by Proximity
**`GET /api/listSchools?latitude=40.7306&longitude=-73.9352`**

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Springfield High School",
      "address": "123 Education Lane",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "distance": "8.32 km"
    }
  ]
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Valid user latitude and longitude are required as query parameters"
}
```

---

## ☁️ Deployment Instructions

*   **Backend (Render Canvas):** Set the build command to `npm install` and the start command to `node app.js`. Pass your database connection credentials into the Environment Variables panel.
*   **Frontend (Vercel):** Connect the GitHub repository directly to Vercel and set the Build command to `npm run build` from the `frontend/` directory. Be sure to configure Vite's proxy via a remote server URL, or modify `services/api.js` to point to your live Render endpoint instead of localhost via `import.meta.env.VITE_API_BASE_URL`.
*   **Database:** Setup Aiven or PlanetScale, grab the MySQL connection string, and pass those parameters down into your `.env`. No changes to the codebase are needed as `mysql2/promise` supports URI connections or discrete host/password setups securely.
