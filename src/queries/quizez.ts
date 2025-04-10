"use server";
import { QuizProps } from "@/types";
import { ApiError, ApiResponse } from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";
import axios, { AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

const createQuizToSubtopic = async (
  state: QuizProps,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/quizzes/create`,
      state,
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
        message: error.response.data?.message || "Couldn't create quiz.",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { createQuizToSubtopic };
