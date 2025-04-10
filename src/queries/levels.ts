"use server";
import { LevelsData, ApiError, ApiResponse } from "@/types/queries";
import { getAuthToken } from "@/utils/getServerCookies";
import axios, { AxiosError } from "axios";

const getLevels = async (): Promise<ApiResponse<LevelsData> | ApiError> => {
  const token = await getAuthToken();
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/get-levels`,
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
        message: error.response.data?.message || "Error fetching Levels",
        statusCode: error.response.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

// const deleteLevel = async (
//   id: string,
// ): Promise<ApiResponse<any> | ApiError> => {
//   const token = await getAuthToken();
//   try {
//     const res = await axios.delete(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/admins/level/delete/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );
//     revalidatePath("/dashboard/levels");
//     return { success: true, data: res.data };
//   } catch (error) {
//     if (error instanceof AxiosError && error.response) {
//       return {
//         success: false,
//         message: error.response.data?.message || "Error Deleting Level",
//         statusCode: error.response.status,
//       };
//     }

//     return {
//       success: false,
//       message: "An unexpected error occurred",
//     };
//   }
// };

export { getLevels };
