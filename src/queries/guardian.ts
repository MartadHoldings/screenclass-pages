"use server";
import axios, { AxiosError } from "axios";
import { ApiResponse, ApiError, GuardianData } from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";
import { UserType } from "@/context/app-context";
import { revalidatePath } from "next/cache";

const getGuardians = async (): Promise<
  ApiResponse<GuardianData> | ApiError
> => {
  const token = await getAuthToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/guardians`,
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
        message: error.response.data?.message || "Error fetching guardians",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const getGuardianDetails = async (
  id: string,
): Promise<ApiResponse<UserType> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/guardian/${id}`,
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
          error.response.data?.message || "Error fetching Guardian details",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const suspendGuardian = async (): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/guardians/disable/67b8759495124d8006f9eb97`,
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
        message: error.response?.statusText || "Error suspending guardian",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const deleteGuardian = async (
  id: string,
): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/guardian/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    revalidatePath("/guardians");

    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.statusText || "Error deleting guardian",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { getGuardians, getGuardianDetails, suspendGuardian, deleteGuardian };
