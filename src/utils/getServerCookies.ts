"use server";
import { cookies } from "next/headers";

export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value || null;
  return token;
}
