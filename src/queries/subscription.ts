"use server";

import axios, { AxiosError } from "axios";
import { getAuthToken } from "@/utils/getServerCookies";
import {
  ApiResponse,
  ApiError,
  SubscribeUserProps,
  SubscriptionPlan,
} from "@/types/queries";
import { SubscribeUser } from "@/types";

const subscribeUser = async ({
  params,
}: {
  params: SubscribeUser;
}): Promise<ApiResponse<any> | ApiError> => {
  const token = await getAuthToken();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/subscribe-user`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return { success: true, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Couldn't subscribe user",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

const getSubscriptionPlans = async (): Promise<
  ApiResponse<SubscriptionPlan[]> | ApiError
> => {
  const token = await getAuthToken();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/plans`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data: res.data.data }; // ✅ Fix: Access `.data.data`
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Unable to load plans",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export { subscribeUser, getSubscriptionPlans };
