"use client";

import React from "react";

import { Maybe } from "@/types/common";
import { AdminProps } from "@/types/index";

interface AuthContextProps {
  admin: AdminProps | null; // admin object or null when not logged in
  loginAdmin?: (admin: AdminProps) => void;
  setAdminToken: (access_token: string) => void;
}

const defaultContext: AuthContextProps = {
  admin: null,
  loginAdmin: async () => {},
  setAdminToken: () => {},
};

// Create the AuthContext
export const AuthContext =
  React.createContext<AuthContextProps>(defaultContext);

// AuthContextProvider component
export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren & {}) => {
  const [admin, setAdmin] = React.useState<Maybe<AdminProps>>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const setAdminToken = (access_token: string) => {
    if (!access_token) throw new Error("Token not found.");
    localStorage.setItem("SCREENCLASS-ADMIN-TOKEN", access_token);
  };

  // Load admin from localStorage on mount
  React.useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");

    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin)); // Set admin state
    }
  }, []);

  // Provide the context
  return (
    <AuthContext.Provider value={{ admin, setAdminToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return ctx;
};
