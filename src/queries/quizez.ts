"use server";
import { AddMoreQuizProps, QuizProps, QuizQuestion } from "@/types";
import { ApiError, ApiResponse, HasQuizResponse } from "@/types/queries";
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

const hasQuiz = async (
  subtopicId: string,
): Promise<ApiResponse<HasQuizResponse> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/quizzes/has-quiz/${subtopicId}`,
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
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message || "checking quiz presence failed",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const addMoreQuiz = async (
  payload: AddMoreQuizProps,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/quizzes/edit-quiz`,
      payload,
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
        message: error.response.data.message || "Couldn't Add more ",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { createQuizToSubtopic, hasQuiz, addMoreQuiz };
