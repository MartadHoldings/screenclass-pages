import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export const Settings = () => {
  return (
    <>
      <div>
        <h2 className="text-[1.3rem] font-semibold">Settings</h2>

        <div className="mt-10 h-[70vh] w-full bg-white p-4">
          <p className="text-lg font-semibold">Personal Details</p>

          <div className="mt-4 flex w-full items-center gap-4">
            <div className="w-1/2 space-y-3">
              <Label htmlFor="first_name">First name</Label>
              <Input
                type="text"
                id="first_name"
                className="h-[50px]"
                placeholder="John"
              />
            </div>
            <div className="w-1/2 space-y-3">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                type="text"
                id="last_name"
                className="h-[50px]"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="mt-5 w-full space-y-3">
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              className="h-[50px]"
              placeholder="you@martad.com"
            />
          </div>

          <div className="mt-5 w-full space-y-3">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              type="number"
              id="phone_number"
              className="h-[50px]"
              placeholder="+23456765899"
            />
          </div>

          <div className="mt-5 w-full space-y-3">
            <Label htmlFor="photor">Profile Photo</Label>
            <Input type="file" id="photo" className="h-[50px]" />
          </div>
        </div>
      </div>
    </>
  );
};
