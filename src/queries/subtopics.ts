"use server";
import { SubtopicProps } from "@/features/admin/add-content-to-subject/add-subtopic";
import { ApiError, ApiResponse, SubTopicsData } from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";
import axios, { AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

const addSubtopic = async ({
  form,
}: {
  form: SubtopicProps;
}): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/subtopic/create`,
      {
        name: form.name,
        topicId: form?.topicId,
        description: form.description,
        videoLink: form.videoLink,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Could'nt add sub topic ",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const getSubtopics = async (
  id: string,
): Promise<ApiResponse<SubTopicsData> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/get-subtopics/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Could'nt get sub topics ",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { addSubtopic, getSubtopics };
