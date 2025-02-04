"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "antd";
import Image from "next/image";
import AuthLayout from "@/layout/AuthLayout";
import Link from "next/link";

export const Login = () => {
  const [type, setType] = React.useState<"login" | "create">("login");

  const handleToggle = () => {
    if (type === "login") {
      setType("create");
    } else {
      setType("login");
    }
  };
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
            {type === "login"
              ? "Login to Admin Dashboard"
              : "Create an Account to Access Admin Dashboard"}
          </h2>

          <form className="mx-auto mt-10 w-[80%]">
            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="email">EMAIL ADDRESS</Label>
              <Input
                type="email"
                id="email"
                className="h-[50px]"
                placeholder="you@martad.com"
              />
            </div>
            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="email">PASSWORD</Label>
              <Input
                type="password"
                id="password"
                className="h-[50px]"
                placeholder=""
              />
            </div>{" "}
            {type === "login" && (
              <div className="mt-5 flex justify-center">
                <Link
                  href="/forgot-password"
                  className="mt-4 text-center text-slate-500 hover:cursor-pointer hover:text-blue-600"
                >
                  Forgot password?
                </Link>
              </div>
            )}
            <Link href="/overview">
              <Button
                style={{ backgroundColor: "#F7631B" }}
                size="large"
                type="primary"
                className="mt-6 h-[50px] w-full"
              >
                {type === "login" ? "Log in" : "Create account"}
              </Button>
            </Link>
          </form>

          <div className="mt-auto">
            <p className="text-center text-slate-500">
              Don’t have an account?{" "}
              <span
                className="ml-2 text-blue-600 hover:cursor-pointer"
                onClick={handleToggle}
              >
                {type === "login" ? "Create an account" : "Login in to account"}
              </span>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
