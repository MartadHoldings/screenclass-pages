"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { ApiResponse, ApiError } from "@/types/queries";
import { CreateAdmin, Login } from "@/types";
import { getAuthToken } from "@/utils/getServerCookies";

const adminLogin = async ({
  form,
}: {
  form: Login;
}): Promise<ApiResponse<any> | ApiError> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/login`,
      form,
    );
    const token = res.data.data;
    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 1 day
    });

    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Something went wrong",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const createAdmin = async (
  form: CreateAdmin,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/create`,
      form,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Something went wrong",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { adminLogin, createAdmin };
