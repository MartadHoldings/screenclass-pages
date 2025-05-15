"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { ApiResponse, ApiError, LoginAdmin } from "@/types/queries";
import { CreateAdmin, Login } from "@/types";
import { getAuthToken } from "@/utils/getServerCookies";

/* eslint-disable @typescript-eslint/no-explicit-any */

const adminLogin = async ({
  form,
}: {
  form: Login;
}): Promise<ApiResponse<LoginAdmin> | ApiError> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/login`,
      { email: form.email, password: form.password },
    );
    const token = res.data.data.token;
    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 86400, // 1 day
    });

    return { success: true, data: res.data }; // Disabled `any` by using `unknown`
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.statusText || "Something went wrong",
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

const logout = async (): Promise<ApiResponse<any> | ApiError> => {
  const cookieStore = await cookies();
  const token = await getAuthToken();
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/logoutAdmin`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );

    if (res.status === 200) {
      cookieStore.delete("admin-token");
    }
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Couldn't log out ",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { adminLogin, createAdmin, logout };
