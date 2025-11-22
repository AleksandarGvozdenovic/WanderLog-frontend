# WanderLog

WanderLog is a web application for planning trips and tracking travel expenses.  
It enables users to create trips, attach activities to each trip, monitor budgets versus actual spending, and record notes and ratings for their travel experiences.

> This repository contains the **frontend** application.  
> The backend API is available in a separate repository:  
> `WanderLog-backend` (Node.js / Express / MongoDB).

---

## 1. Product Overview

WanderLog is designed as a lightweight personal travel planner with a focus on:

- **Simplicity** – fast entry of trips and activities with minimal friction.
- **Budget awareness** – clear visibility into planned budget vs. actual expenses.
- **User ownership** – each user sees only their own trips and activities via secure authentication.

Typical user flow:

1. Register or log in.
2. Create a new trip with title, destination, dates, and budget.
3. Add activities (e.g. flights, hotels, tours) to the trip.
4. Mark activities as planned or completed, assign ratings, and leave comments.
5. Track total spending per trip and compare it to the original budget.

---

## 2. Key Features

### Authentication & Authorization

- User registration and login with email/password.
- JWT-based authentication.
- Token stored in `localStorage` and attached to each API request.
- Automatic session restoration on page refresh.
- Protected routes on the frontend:
  - `/app/trips` – trips dashboard
  - `/app/trips/:id` – trip details
  - `/app/trips/:id/edit` – edit trip
  - `/app/trips/:id/activity/:activityId/edit` – edit activity

### Trip Management

- Create, view, update, and delete trips.
- Fields:
  - Title
  - Destination
  - Start date / End date
  - Budget
- Dashboard with a list of all trips for the current user.

### Activity Management

- Add activities under a specific trip.
- Fields:
  - Name
  - Location
  - Price & currency
  - Date
  - Status: planned / done
  - Rating (1–5, optional)
  - Comment (optional)
- Edit and delete existing activities.
- Toggle completion status directly from the trip details page.

### Budget & Spending

- Automatic calculation of total activity cost per trip.
- Display of:
  - Budget (planned)
  - Spent (sum of all activity prices)

---

## 3. Architecture

WanderLog follows a **client–server** architecture:

- **Frontend** (this repository)
  - React + Vite
  - React Router for routing
  - Tailwind CSS for styling
  - Axios for HTTP requests
  - react-hot-toast for notifications
  - Context-based state management for authentication

- **Backend** (separate repository)
  - Node.js / Express
  - MongoDB with Mongoose
  - JWT for authentication
  - Bcrypt for password hashing
  - Route-level authorization using a `protect` middleware

The frontend communicates with the backend over a REST API.  
An Axios instance is configured with a base URL and attaches the JWT token via the `Authorization: Bearer <token>` header.

---

## 4. Technology Stack

### Frontend

- **Framework:** React (Vite)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** react-hot-toast
- **Tooling:** Vite, ESLint, PostCSS, Autoprefixer

### Backend 

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT + Bcrypt
- **Middleware:** Custom error handling & auth protection
