export interface Student {
  id: number;
  name: string;
  user_id: string;
  phone_number: string;
  reg_date: string;
  email: string;
  class: string;
}

// Define the Guardian interface, extending Student but omitting "class"
export type Guardian = Omit<Student, "class">;
