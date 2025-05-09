import { Node } from "./common";
import { QuizType } from ".";

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

export interface LoginAdmin {
  message: string;
  data: {
    token: string;
    admin: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      ascid: string;
      username: string;
      role: string;
    };
  };
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

// export interface GuardianProps
//   extends Omit<
//     StudentProps,
//     "type" | "subscriptionStatus" | "guardian" | "level"
//   > {
//   students: { scid: string; firstName: string; lastName: string }[];
// }

export interface GuardianProps extends Node {
  _id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  status: string;
  scid: string;
  email: string;
  role: string;
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

export interface Chart {
  date: string;
  sub: number;
  unsub: number;
}

export type Activity = {
  id: string;
  message: string;
  createdAt: string;
};

export interface ChartsProps {
  data: {
    charts: Chart[];
  };
}

export interface ActivityProps {
  data: Activity[];
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

export interface SubTopicProps {
  _id: string;
  name: string;
  status: string;
  topic: string;
  quizId: string | null;
  notes: string | null;
  videoLink: string;
}

export interface SubTopicsData {
  data: SubTopicProps[];
}

export interface HasQuizResponse {
  hasQuiz: boolean;
}
