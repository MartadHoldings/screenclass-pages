export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export type LoginProps = {
  email: string;
  password: string;
  status?: number | null | undefined;
};

export type CreateAdminProps = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
};
