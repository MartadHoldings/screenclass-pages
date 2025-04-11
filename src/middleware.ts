import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthToken } from "./utils/getServerCookies";

// This function can be marked `async` if using `await` inside

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtected = path.startsWith("/dashboard");
  const isPublic = publicRoutes.includes(path);

  const token = request.cookies.get("admin-token")?.value;

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/", "/forgot-password"],
};
