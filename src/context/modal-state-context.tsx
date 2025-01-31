"use client";
import React from "react";

interface AppContextProps {
  activeDropDown: string | null; // Active dropdown action, would be null on page load
  tableActionModal: string | null; // Active modal state of pages without dropdown function, would be null on page load
  loading: boolean;
  setActiveDropDown: React.Dispatch<React.SetStateAction<string | null>>;
  setTableActionModal: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: AppContextProps = {
  activeDropDown: null,
  tableActionModal: null,
  loading: false,
  setActiveDropDown: () => {},
  setTableActionModal: () => {},
  setLoading: () => {},
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

  const [tableActionModal, setTableActionModal] = React.useState<string | null>(
    null,
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <AppInteractionsContext.Provider
      value={{
        activeDropDown,
        setActiveDropDown,
        tableActionModal,
        setTableActionModal,
        loading,
        setLoading,
      }}
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
