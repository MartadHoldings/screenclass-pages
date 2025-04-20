"use client";
import React, { useReducer } from "react";
import { GuardianProps, StudentProps, UserType } from "@/types/queries";

interface TransformedUser {
  mobile: string;
  email: string;
  scid: string;
  guardian?: {
    _id: string;
    lastName: string;
    firstName: string;
  };
  status: string;
  subscriptionStatus?: boolean;
  level?: {
    _id: string;
    name: string;
  };
  firstName: string;
  lastName: string;
  role: string;
  students?: { scid: string; firstName: string; lastName: string }[];
}

type Action =
  | { type: "SET_USER_DETAILS"; payload: UserType }
  | { type: "RESET_USER_DETAILS" };

const transformStudent = (user: StudentProps): TransformedUser => ({
  mobile: user.mobile,
  email: user.email,
  scid: user.scid,
  guardian: user.guardian,
  status: user.status,
  level: user.level,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  subscriptionStatus: user.subscriptionStatus,
});

const transformGuardian = (user: GuardianProps): TransformedUser => ({
  mobile: user.mobile,
  email: user.email,
  scid: user.scid,
  status: user.status,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  students: user.students,
});

// Type guard to check if the user is StudentProps
function isStudentProps(user: UserType): user is StudentProps {
  return (user as StudentProps).type !== undefined;
}

const userReducer = (
  state: TransformedUser | null,
  action: Action,
): TransformedUser | null => {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return isStudentProps(action.payload)
        ? transformStudent(action.payload)
        : transformGuardian(action.payload);
    case "RESET_USER_DETAILS":
      return null;
    default:
      return state;
  }
};

interface AppContextProps {
  userDetails: TransformedUser | null;
  setUserDetails: (user: UserType) => void;
  resetUserDetails: () => void;
}

const defaultContext: AppContextProps = {
  userDetails: null,
  setUserDetails: () => {},
  resetUserDetails: () => {},
};

export const AppContext = React.createContext<AppContextProps>(defaultContext);

export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userDetails, dispatch] = useReducer(userReducer, null);

  const setUserDetails = (user: UserType) => {
    dispatch({ type: "SET_USER_DETAILS", payload: user });
  };

  const resetUserDetails = () => {
    dispatch({ type: "RESET_USER_DETAILS" });
  };

  return (
    <AppContext.Provider
      value={{ userDetails, setUserDetails, resetUserDetails }}
    >
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
