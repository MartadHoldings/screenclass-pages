"use client";

import React from "react";

import { Maybe } from "@/types/common";
import { AdminProps } from "@/types/index";

interface AuthContextProps {
  admin: AdminProps | null; // admin object or null when not logged in
  loginAdmin?: (admin: AdminProps) => void;
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

  // Provide the context
  return (
    <AuthContext.Provider value={{ admin }}>{children}</AuthContext.Provider>
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
