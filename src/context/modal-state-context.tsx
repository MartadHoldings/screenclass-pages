"use client";
import React from "react";

interface AppContextProps {
  activeDropDown: string | null; // Active dropdown action, would be null on page load
  setActiveDropDown: React.Dispatch<React.SetStateAction<string | null>>;
  // loginUser: (user: UserProps) => void;
}

const defaultContext: AppContextProps = {
  activeDropDown: null,
  setActiveDropDown: () => {},
  // loginUser: async () => {},
};

export const AppInteractionsContext =
  React.createContext<AppContextProps>(defaultContext);

// AuthContextProvider component
export const AppInteractionsContextProvider = ({
  children,
}: React.PropsWithChildren & {}) => {
  const [activeDropDown, setActiveDropDown] = React.useState<string | null>(
    null,
  );

  return (
    <AppInteractionsContext.Provider
      value={{ activeDropDown, setActiveDropDown }}
    >
      {children}
    </AppInteractionsContext.Provider>
  );
};

export const useAppInteractionContext = () => {
  const ctx = React.useContext(AppInteractionsContext);
  if (!ctx) {
    throw new Error(
      "useAppInteractionContext must be used within an App interactions context",
    );
  }
  return ctx;
};
