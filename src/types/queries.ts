export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface StatsProps {
  data: {
    totalStudents: number;
    totalGuardians: number;
    totalSubjects: number;
    totalClasses: number;
  };
}

export type CreateAdminProps = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
};
