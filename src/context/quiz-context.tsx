"use client";

import { quizInitialState, quizReducer } from "@/reducer/quizReducer";
import { QuizAction, QuizProps } from "@/types";
import { createContext, useReducer, useContext } from "react";

type QuizContextProps = {
  state: QuizProps;
  dispatch: React.Dispatch<QuizAction>;
};

export const QuizFormContext = createContext<QuizContextProps | undefined>(
  undefined,
);

export const QuizFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(quizReducer, quizInitialState);

  return (
    <QuizFormContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizFormContext.Provider>
  );
};

export const useQuizForm = () => {
  const context = useContext(QuizFormContext);
  if (!context)
    throw new Error("useQuizForm must be used within QuizFormProvider");
  return context;
};
