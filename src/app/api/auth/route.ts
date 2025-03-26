import { NextResponse } from "next/server";
import { adminLogin } from "@/queries/auth";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse request body

    if (!body.form) {
      return NextResponse.json(
        { message: "Missing form data" },
        { status: 400 },
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/login`,
      body.form,
    );

    console.log(response.status);

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    } else {
      const token = response.data.data;

      // Set the token in an HTTP-only cookie
      const responseHeaders = new Headers();
      responseHeaders.append(
        "Set-Cookie",
        `admin-token=${token}; HttpOnly; Path=/; Max-Age=86400; ${
          process.env.NODE_ENV === "production" ? "Secure;" : ""
        } SameSite=Strict`,
      );
      return NextResponse.json(
        { message: "Logged in successfully" },
        { status: 200, headers: responseHeaders },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
