// src/context/AuthContext.jsx
import { createContext, useCallback, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true",
  );
  const [email, setEmail] = useState(
    () => localStorage.getItem("userEmail") || "",
  );

  const signIn = useCallback((userEmail) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", userEmail);
    setEmail(userEmail);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setEmail("");
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, email, signIn, signOut }),
    [isAuthenticated, email, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
