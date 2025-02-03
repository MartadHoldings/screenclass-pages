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

export type TableData = Record<string, any>;
