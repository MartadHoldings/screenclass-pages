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
  role: string;
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
  students: { scid: string; firstName: string; lastName: string }[];
}

export interface StudentsData {
  data: {
    users: StudentProps[];
  };
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

export interface TransformedUser {
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

export type UserType = StudentProps | GuardianProps;

export interface LevelsProps extends Node {
  _id: string;
  name: string;
  status: string;
  code: string;
  classes: {
    _id: string;
    name: string;
    status: string;
  }[];
}

export interface LevelsData {
  data: LevelsProps[];
}

export interface SubjectsProps extends Node {
  _id: string;
  name: string;
  status: string;
  level: string;
  subjects: {
    _id: string;
    name: string;
    status: string;
    class: string;
    topics: string[];
  }[];
}

export interface SubjectsData {
  data: SubjectsProps[];
}

export interface TopicProps extends Node {
  _id: string;
  status: string;
  name: string;
  subject: string;
  subTopics: string[];
}

export interface TopicsData {
  data: TopicProps[];
}

export interface VideoProps extends Node {
  _id: string;
  name: string;
  description: string;
  isLinked: boolean;
  duration: string;
}

export interface VideoData {
  data: VideoProps[];
}
