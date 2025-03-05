import axios, { AxiosError } from "axios";
import { ApiResponse, ApiError } from "@/types/queries";
import { CreateAdminProps, LoginProps } from "@/types/queries";

const adminLogin = async ({
  form,
}: {
  form: LoginProps;
}): Promise<ApiResponse<any> | ApiError> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/login`,
      form,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    return { success: true, data: res.data }; // ✅ Success case
  } catch (error) {
    // ✅ Ensure error is properly typed
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

const createAdmin = async ({ data }: { data: CreateAdminProps }) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/admins/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};

export { adminLogin, createAdmin };
