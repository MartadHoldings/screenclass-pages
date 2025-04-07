"use client";
import "@ant-design/v5-patch-for-react-19";
import { Label } from "@/components/ui/label";
import { Select, Input, Button } from "antd";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { createAdmin } from "@/queries/auth";
import { CreateAdmin } from "@/types";

export const CreateAccount = () => {
  const [form, setForm] = useState<CreateAdmin>({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isPending, startTransition] = useTransition();

  const handleSelect = (value: string) => {
    setForm((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form);

    startTransition(async () => {
      try {
        const result = await createAdmin(form);
        if (result.success) {
          toast.success(result.data.message);
        } else {
          toast.error(result.message, {});
        }
      } catch (error) {
        console.log(error); // ✅ Now correctly logs
        toast.error("something went wrong");
      }
    });
  };

  return (
    <>
      <div>
        <h2 className="text-[1.3rem] font-semibold">Create Account</h2>

        <form
          className="mt-10 h-[70vh] w-full bg-white p-4"
          onSubmit={handleSubmit}
        >
          <p className="text-lg font-semibold">Personal Details</p>

          <div className="mt-4 flex w-full items-center gap-4">
            <div className="w-1/2 space-y-3">
              <Label htmlFor="first_name">First name</Label>
              <Input
                onChange={handleChange}
                id="first_name"
                className="h-[50px]"
                placeholder="John"
                name="firstName"
              />
            </div>
            <div className="w-1/2 space-y-3">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                type="text"
                id="last_name"
                className="h-[50px]"
                placeholder="Doe"
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4 flex w-full items-center gap-4">
            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                className="h-[50px]"
                placeholder="you@martad.com"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="mt-5 w-full space-y-3">
              <Label htmlFor="role">Role</Label>
              <Select
                style={{ width: "100%", height: "50px" }}
                placeholder="Select Role"
                optionFilterProp="label"
                options={[
                  { label: "Admin", value: "ADMIN" },
                  { label: "Super admin", value: "SUPERADMIN" },
                ]}
                onChange={handleSelect}
              />
            </div>
          </div>

          <div className="mt-5 w-full space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              id="password"
              className="h-[50px]"
              placeholder="you@email.com"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="mt-10 flex items-center justify-center">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isPending}
              iconPosition="end"
              className="h-[50px]"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
