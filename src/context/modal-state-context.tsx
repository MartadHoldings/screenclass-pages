"use client";
import React from "react";

export type ActiveDropDown = {
  id: string;
  label: string;
};

interface AppContextProps {
  activeDropDown: ActiveDropDown | null; // controls modal apperance for dropdowns on student and guardins table, would be null on page load, (label as the func) and (id as the user's id to perform the func or api call on)
  tableActionModal: string | null; // Active modal state of pages without dropdown function, would be null on page load
  selectedPlan: string | null; // this state holds the id of a selected subscription plan, to be used in subscribe student api
  loading: boolean;
  setActiveDropDown: React.Dispatch<
    React.SetStateAction<ActiveDropDown | null>
  >;
  setTableActionModal: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedPlan: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext: AppContextProps = {
  activeDropDown: null,
  tableActionModal: null,
  selectedPlan: null,
  loading: false,
  setActiveDropDown: () => {},
  setTableActionModal: () => {},
  setSelectedPlan: () => {},
  setLoading: () => {},
};

export const AppInteractionsContext =
  React.createContext<AppContextProps>(defaultContext);

// AuthContextProvider component
export const AppInteractionsContextProvider = ({
  children,
}: React.PropsWithChildren & {}) => {
  const [activeDropDown, setActiveDropDown] =
    React.useState<ActiveDropDown | null>(null);

  const [tableActionModal, setTableActionModal] = React.useState<string | null>(
    null,
  );

  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <AppInteractionsContext.Provider
      value={{
        activeDropDown,
        setActiveDropDown,
        tableActionModal,
        setTableActionModal,
        selectedPlan,
        setSelectedPlan,
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
