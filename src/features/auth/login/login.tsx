"use client";
import React from "react";
import "@ant-design/v5-patch-for-react-19";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "antd";
import Image from "next/image";
import AuthLayout from "@/layout/AuthLayout";
import Link from "next/link";
import { adminLogin } from "@/queries/auth";
import { ApiError } from "@/types/queries";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Login = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await adminLogin({ form });
        if (result.success) {
          router.push("/overview");
          toast.success(result.data.message);
        } else {
          toast.error(result.message, {
            description: "Please try again or create an account",
          });
        }
      } catch (error: ApiError | any) {
        console.log(error); // ✅ Now correctly logs
        toast.error("something went wrong");
      }
    });
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
              priority
              className="size-auto"
            />
          </div>
          <h2 className="mt-10 w-[60%] text-balance text-center text-2xl font-medium">
            Login to Admin Dashboard
          </h2>

          <form className="mx-auto mt-10 w-[80%]" onSubmit={handleLogin}>
            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="email">EMAIL ADDRESS</Label>
              <Input
                type="email"
                id="email"
                className="h-[50px]"
                placeholder="you@martad.com"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="email">PASSWORD</Label>
              <Input
                type="password"
                id="password"
                className="h-[50px]"
                placeholder=""
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>{" "}
            <div className="mt-5 flex justify-center">
              <Link
                href="/forgot-password"
                className="mt-4 text-center text-slate-500 hover:cursor-pointer hover:text-blue-600"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              style={{ backgroundColor: "#F7631B" }}
              size="large"
              type="primary"
              className="mt-6 h-[50px] w-full"
              htmlType="submit"
              loading={isPending}
              iconPosition="end"
            >
              Login
            </Button>
          </form>

          <div className="mt-auto">
            <p className="text-center text-slate-500">
              Don’t have an account? contact a superadmin to create one for you
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
