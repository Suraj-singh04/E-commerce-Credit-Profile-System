// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [customerId, setCustomerId] = useState(() =>
    localStorage.getItem("customerId")
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (customerId) localStorage.setItem("customerId", customerId);
    else localStorage.removeItem("customerId");
  }, [customerId]);

  function logout() {
    setToken(null);
    setUser(null);
    setCustomerId(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        customerId,
        setCustomerId,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
