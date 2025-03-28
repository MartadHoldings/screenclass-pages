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
  username: string;
  email: string;
  password: string;
  role: string;
};

export type SubscribeUser = {
  userId: string;
  planId: string | null;
};
