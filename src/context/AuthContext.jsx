import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("portfolio_token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("portfolio_token");
      if (storedToken) {
        try {
          const res = await api.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            setToken(storedToken);
          } else {
            localStorage.removeItem("portfolio_token");
            setUser(null);
            setToken(null);
          }
        } catch {
          localStorage.removeItem("portfolio_token");
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const result = await api.login(credentials);
      if (result.success && result.token) {
        localStorage.setItem("portfolio_token", result.token);
        setToken(result.token);
        setUser(result.user);
        return result;
      } else {
        throw new Error(result.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("portfolio_token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.getMe();
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
