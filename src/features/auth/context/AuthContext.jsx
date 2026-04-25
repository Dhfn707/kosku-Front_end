import { createContext, useContext, useState, useEffect } from "react";
import api from '@/config/axios';
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMe = async () => {
    try {
      const response = await api.get("/user");
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const csrf = () => axios.get("/sanctum/csrf-cookie", { withCredentials: true });

  const login = async (credentials) => {
    setError(null);
    try {
      await csrf();
      await api.post("/login", credentials);
      await getMe();
    } catch (err) {
      // Extract Laravel validation errors or general message
      const errorData = err.response?.data;
      setError(errorData?.errors || errorData?.message || "Login failed");
      throw err;
    }
  };

  const register = async (data) => {
    setError(null);
    try {
      await csrf();
      await api.post("/register", data);
      await getMe();
    } catch (err) {
      const errorData = err.response?.data;
      setError(errorData?.errors || errorData?.message || "Registration failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error, setError, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};
