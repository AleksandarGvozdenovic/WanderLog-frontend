import { createContext, useContext, useEffect, useState } from "react";
import { api, setAuthToken } from "../api/client.js";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("wanderlog_token");
    if (!token) {
      setInitializing(false);
      return;
    }

    setAuthToken(token);
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        setAuthToken(null);
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    setAuthToken(res.data.token);
    setUser({
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email
    });
    toast.success("Welcome back 👋");
  };

  const register = async (name, email, password) => {
    const res = await api.post("/api/auth/register", { name, email, password });
    setAuthToken(res.data.token);
    setUser({
      _id: res.data._id,
      name: res.data.name,
      email: res.data.email
    });
    toast.success("Account created 🎉");
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
