"use server";
import { AddNew } from "@/context/data-context";
import { Createsubject } from "@/types";
import {
  ApiError,
  ApiResponse,
  SubjectsData,
  TopicsData,
} from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */

const getClassSubjects = async (): Promise<
  ApiResponse<SubjectsData> | ApiError
> => {
  try {
    const token = await getAuthToken();

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/enitire-classes`,
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
        message:
          error.response.data?.message || "Error fetching Classes and subjects",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const addTopicToSubject = async ({
  form,
}: {
  form: AddNew | null;
}): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/topic/create`,
      { name: form?.name, subjectId: form?.subjectId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    revalidatePath("/class-subjects");
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Could'nt add topic ",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const getTopicsUnderSubject = async (
  id: string,
): Promise<ApiResponse<TopicsData> | ApiError> => {
  try {
    const token = await getAuthToken();

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/get-topics/${id}`,
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
        message: error.response.data?.message || "Couldn't fetch topic",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const addSubjectToClass = async ({
  form,
}: {
  form: Createsubject | null;
}): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/subject/create`,
      { name: form?.name, subjectId: form?.classId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    revalidatePath("/class-subjects");
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Could'nt add subject",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const deleteTopicFrmSubj = async (
  id: string,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/topic/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath("/dashboard/class-subjects");

    return { success: true, data: res.data }; // ✅ Fix: Access `.data.data`
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Unable to delete Topic",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const deleteSubject = async (
  id: string,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/subject/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath("/dashboard/class-subjects");

    return { success: true, data: res.data }; // ✅ Fix: Access `.data.data`
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Unable to delete Subject",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export {
  getClassSubjects,
  addTopicToSubject,
  getTopicsUnderSubject,
  addSubjectToClass,
  deleteTopicFrmSubj,
  deleteSubject,
};
