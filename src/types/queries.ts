import { Node } from "./common";

export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface StudentProps extends Node {
  _id: string;
  key: number;
  firstName: string;
  lastName: string;
  scid: string;
  username: string;
  type: string;
  mobile: string;
  email: string;
  subscriptionStatus: boolean;
  status: string;
  level: {
    _id: string;
    name: string;
  };
  guardian: {
    firstName: string;
    lastName: string;
    _id: string;
  };
}

export interface GuardianProps
  extends Omit<
    StudentProps,
    "type" | "subscriptionStatus" | "guardian" | "level"
  > {
  students: string[];
}

export interface StudentsData {
  data: { users: StudentProps[] };
}

export interface GuardianData {
  data: GuardianProps[];
}

export interface StatsProps {
  data: {
    totalStudents: number;
    totalGuardians: number;
    totalSubjects: number;
    totalClasses: number;
  };
}

export interface SubscribeUserProps extends Node {
  user: string;
  plan: string;
  startDate: string;
  expiryDate: string;
  status: string;
  _id: string;
}

export interface SubscriptionPlan extends Node {
  _id: string;
  name: string;
  validity: number;
  price: string;
  status: string;
}
