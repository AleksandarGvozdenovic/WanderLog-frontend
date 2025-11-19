import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("wanderlog_token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("wanderlog_token");
  }
};
