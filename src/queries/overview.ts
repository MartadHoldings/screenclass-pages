"use server";
import axios, { AxiosError } from "axios";
import { ApiResponse, ApiError, StatsProps } from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";

const getStats = async (): Promise<ApiResponse<StatsProps> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Error fetching stats",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { getStats };
