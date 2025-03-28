"use client";

import React from "react";

import { GuardianProps, StudentProps } from "@/types/queries";

export interface UserType {
  data: StudentProps | GuardianProps;
}

interface AppContextProps {
  userDetails: UserType | null; // student object or null to display student details
  setUserDetails: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const defaultContext: AppContextProps = {
  userDetails: null,
  setUserDetails: () => {},
};

// Create the AppContext
export const AppContext = React.createContext<AppContextProps>(defaultContext);

// AppContextProvider component
export const AppContextProvider = ({
  children,
}: React.PropsWithChildren & {}) => {
  const [userDetails, setUserDetails] = React.useState<UserType | null>(null);

  // Provide the context
  return (
    <AppContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = React.useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return ctx;
};
