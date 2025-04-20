import { Node } from "./common";

export interface Student {
  id: number;
  key: number;
  name: string;
  user_id: string;
  phone_number: string;
  reg_date: string;
  email: string;
  class: string;
}

// Define the Guardian interface, extending Student but omitting "class"
export type Guardian = Omit<Student, "class">;

export interface DataType {
  key: React.Key;
  class?: string;
  id?: number | string;
  no_of_subject?: number;
}

export interface SubjDataType {
  key: React.Key;
  id: number;
  subject?: string;
  subject_code?: number | string;
  number_of_topics?: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableData = Record<string, any>;

export type AdminProps = Node & {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  ascid: string;
  access_token: string;
  __v: number;
};

export interface Login {
  email: string;
  password: string;
}

export type CreateAdmin = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type SubscribeUser = {
  userId: string;
  planId: string | null;
};

export type QuizType = "MCQ" | "True/False";

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id?: string;
  text: string;
  questionType: QuizType;
  options: QuizOption[];
}

export interface QuizProps {
  title: string;
  duration: number;
  isPublished: boolean;
  subTopicId: string;
  questions: QuizQuestion[];
}

export type QuizAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_SUBTOPIC_ID"; payload: string }
  | { type: "TOGGLE_PUBLISH" }
  | { type: "ADD_QUESTION"; payload: QuizQuestion }
  | { type: "UPDATE_QUESTION_TEXT"; index: number; payload: string }
  | { type: "UPDATE_QUESTION_TYPE"; index: number; payload: QuizType }
  | { type: "ADD_OPTION"; qIndex: number; payload: QuizOption }
  | {
      type: "UPDATE_OPTION_TEXT";
      qIndex: number;
      oIndex: number;
      payload: string;
    }
  | { type: "TOGGLE_OPTION_CORRECT"; qIndex: number; oIndex: number }
  | { type: "REMOVE_QUESTION"; index: string }
  | { type: "REMOVE_OPTION"; qIndex: number; oIndex: number }
  | { type: "RESET_FORM" };

export type CreateSubscription = {
  id?: number;
  name: string;
  validity: number;
  price: string;
};

export type Createsubject = {
  name: string;
  classId: string;
};
