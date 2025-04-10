"use server";
import axios, { AxiosError } from "axios";
import {
  ApiResponse,
  ApiError,
  StudentsData,
  StudentProps,
} from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";
import { revalidatePath } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */

const getStudents = async (
  page: number,
  limit: number,
): Promise<ApiResponse<StudentsData> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/students?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Error fetching students",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const getStudentDetails = async (
  id: string,
): Promise<ApiResponse<StudentProps> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/student/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { success: true, data: res.data.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message || "Error fetching student details",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const suspendStudent = async (
  id: string,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/student-suspend/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    revalidatePath("/students");
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Error suspending student",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const deleteStudent = async (
  id: string,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/student/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath("/students");

    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.statusText || "Error deleting student",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { getStudents, getStudentDetails, suspendStudent, deleteStudent };
