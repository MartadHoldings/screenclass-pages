"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layout/AuthLayout";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export const ForgotPassword = () => {
  return (
    <>
      <AuthLayout>
        <div className="flex w-full flex-col items-center">
          <div className="mt-5">
            <Image
              src="/assets/screen-dark 2.svg"
              alt="screen class logo"
              width={250}
              height={50}
            />
          </div>

          <h2 className="mt-10 w-[60%] text-balance text-center text-2xl font-medium">
            Forgot Password
          </h2>

          <form className="mx-auto mt-10 flex h-[40%] w-[80%] flex-col">
            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="email">EMAIL ADDRESS</Label>
              <Input
                type="email"
                id="email"
                className="h-[50px]"
                placeholder="you@martad.com"
              />
            </div>
            <div className="mt-auto">
              <Button
                style={{ backgroundColor: "#F7631B" }}
                size="large"
                type="primary"
                className="h-[50px] w-full"
              >
                Reset Password
              </Button>
            </div>
          </form>

          <div className="mt-5">
            <Link
              href="/"
              className="mt-4 text-center text-blue-600 hover:cursor-pointer"
            >
              Go Back to Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
