# WanderLog – Frontend

WanderLog is a full-stack MERN travel planner that helps users organise trips, plan activities, and keep track of travel expenses.  

This repository contains the **frontend** application built with React and Vite.  
The backend API is in a separate repository.

- **Live app:** https://wanderlog-frontend.netlify.app/  
- **Backend repository:** https://github.com/AleksandarGvozdenovic/WanderLog-backend  


## 1. Product Overview

WanderLog is designed as a lightweight personal travel planner with:

- **Simple workflows** – quickly add trips and activities without unnecessary complexity.
- **Budget awareness** – see planned budget vs. actual spending per trip.
- **Private workspace** – each user has access only to their own trips and activities via authentication.

Typical user flow:

1. Register or log in.
2. Create a new trip (title, destination, dates, budget).
3. Add activities (e.g. flights, accommodation, tours) under that trip.
4. Mark activities as planned or done, add ratings and comments.
5. See how much has been spent compared to the original budget.



## 2. Main Features (Frontend)

### Authentication & Protected Routes

- User registration and login with email/password.
- JWT-based auth handled via the backend.
- Token stored in `localStorage` and attached to all API requests.
- Automatic session restoration on page refresh.
- Protected routes for the app area:
  - `/app/trips` – trips dashboard  
  - `/app/trips/:id` – trip details  
  - `/app/trips/:id/edit` – edit trip  
  - `/app/trips/:id/activity/:activityId/edit` – edit activity  

### Trips

- Create, view, edit and delete trips.
- Fields: title, destination, start date, end date, budget.
- Dashboard view listing all trips for the logged-in user.

### Activities

- Add activities per trip.
- Fields: name, location, price, currency, date, status (planned/done), rating (optional), comment (optional).
- Edit and delete existing activities.
- Toggle status (planned / done) directly from the trip details page.

### Budget Overview

- Automatic sum of all activity prices for a trip.
- Display of:
  - **Budget** (planned)
  - **Spent** (sum of activity prices)


## 3. Frontend Architecture

The frontend is a single-page application built with React and organised into:

- **Pages**
  - `LandingPage` – intro and call-to-action (register / log in)
  - `LoginPage` / `RegisterPage`
  - `DashboardPage` – list and creation of trips
  - `TripDetailsPage` – activities, spending, trip actions
  - `EditTripPage` / `EditActivityPage`

- **Core pieces**
  - **React Router** for navigation and route protection.
  - **AuthContext** for managing user state, login, register and logout.
  - A shared `Layout` and `Navbar` for consistent UI across pages.
  - Reusable components such as `TripCard` and form components.



## 4. Technology Stack

### Frontend

- **Framework:** React (Vite)
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** react-hot-toast
- **Tooling:** Vite, ESLint, PostCSS, Autoprefixer

### Backend (reference)

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + Bcrypt
- **Middleware:** auth protection + error handling  
- **Repo:** https://github.com/AleksandarGvozdenovic/WanderLog-backend  
