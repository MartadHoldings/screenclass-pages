// "use client";

// import React from "react";

// import {
//   GuardianProps,
//   StudentProps,
//   UserType,
//   UserType2,
// } from "@/types/queries";

// interface AppContextProps {
//   userDetails: UserType2 | null; // student object or null to display student details
//   setUserDetails: React.Dispatch<React.SetStateAction<UserType2 | null>>;
// }

// const defaultContext: AppContextProps = {
//   userDetails: null,
//   setUserDetails: () => {},
// };

// // Create the AppContext
// export const AppContext = React.createContext<AppContextProps>(defaultContext);

// // AppContextProvider component
// export const AppContextProvider = ({
//   children,
// }: React.PropsWithChildren & {}) => {
//   const [userDetails, setUserDetails] = React.useState<UserType2 | null>(null);

//   // Provide the context
//   return (
//     <AppContext.Provider value={{ userDetails, setUserDetails }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   const ctx = React.useContext(AppContext);
//   if (!ctx) {
//     throw new Error("useAppContext must be used within an AppContextProvider");
//   }
//   return ctx;
// };

// "use client";

// import React, { useReducer } from "react";
// import {
//   GuardianProps,
//   StudentProps,
//   UserType,
//   TransformedUser,
// } from "@/types/queries";

// // Define the transformed user type

// // Reducer action types
// type Action =
//   | { type: "SET_USER_DETAILS"; payload: UserType }
//   | { type: "RESET_USER_DETAILS" };

// // Reducer function to handle state transformation
// const userReducer = (
//   state: TransformedUser | null,
//   action: Action,
// ): TransformedUser | null => {
//   switch (action.type) {
//     case "SET_USER_DETAILS":
//       return {
//         mobile: action.payload?.mobile,
//         email: action.payload?.email,
//         scid: action.payload?.scid,
//         guardian: action.payload?.guardian,
//         status: action.payload?.status,
//         level: action.payload?.level,
//         firstName: action.payload?.firstName,
//         lastName: action.payload?.lastName,
//         role: action.payload.role,
//       };
//     case "RESET_USER_DETAILS":
//       return null;
//     default:
//       return state;
//   }
// };

// // Context type definition
// interface AppContextProps {
//   userDetails: TransformedUser | null;
//   setUserDetails: (user: UserType) => void;
//   resetUserDetails: () => void;
// }

// // Default context values
// const defaultContext: AppContextProps = {
//   userDetails: null,
//   setUserDetails: () => {},
//   resetUserDetails: () => {},
// };

// // Create the AppContext
// export const AppContext = React.createContext<AppContextProps>(defaultContext);

// // AppContextProvider component
// export const AppContextProvider = ({ children }: React.PropsWithChildren) => {
//   const [userDetails, dispatch] = useReducer(userReducer, null);

//   // Functions to dispatch actions
//   const setUserDetails = (user: UserType) => {
//     dispatch({ type: "SET_USER_DETAILS", payload: user });
//   };

//   const resetUserDetails = () => {
//     dispatch({ type: "RESET_USER_DETAILS" });
//   };

//   return (
//     <AppContext.Provider
//       value={{ userDetails, setUserDetails, resetUserDetails }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// // Custom hook for consuming context
// export const useAppContext = () => {
//   const ctx = React.useContext(AppContext);
//   if (!ctx) {
//     throw new Error("useAppContext must be used within an AppContextProvider");
//   }
//   return ctx;
// };

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
