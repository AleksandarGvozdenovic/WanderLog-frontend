import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import DashboardPage from "./pages/DashboardPage.jsx";
import TripDetailsPage from "./pages/TripDetailsPage.jsx";
import EditTripPage from "./pages/EditTripPage.jsx";
import EditActivityPage from "./pages/EditActivityPage.jsx";

const App = () => {
  return (
    <Routes>
     
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      
      <Route path="/app/trips" element={<DashboardPage />} />
      <Route path="/app/trips/:id" element={<TripDetailsPage />} />
      <Route path="/app/trips/:id/edit" element={<EditTripPage />} />

      
  <Route
  path="/app/trips/:id/activity/:activityId/edit"
  element={<EditActivityPage />}
/>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
