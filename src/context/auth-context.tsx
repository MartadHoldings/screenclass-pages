"use client";

import React from "react";

import { Maybe } from "@/types/common";
import { AdminProps } from "@/types/index";

interface AuthContextProps {
  admin: AdminProps | null; // admin object or null when not logged in
  loginAdmin: ((admin: AdminProps) => void) | undefined;
}

const defaultContext: AuthContextProps = {
  admin: null,
  loginAdmin: async () => {},
};

// Create the AuthContext
export const AuthContext =
  React.createContext<AuthContextProps>(defaultContext);

// AuthContextProvider component
export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren & {}) => {
  const [admin, setAdmin] = React.useState<Maybe<AdminProps>>(null);

  const loginAdmin = (admin: AdminProps) => {
    if (!admin) throw new Error("Admin not found.");
    localStorage.setItem("admin", JSON.stringify(admin));
    setAdmin(admin);
    return admin;
  };

  React.useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");

    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin)); // Set admin state
    }
  }, []);

  // Provide the context
  return (
    <AuthContext.Provider value={{ admin, loginAdmin }}>
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
