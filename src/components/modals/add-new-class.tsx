import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function AddNewClass() {
  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Add a new class</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Enter Class name</Label>
        <Input
          type="text"
          id="class_name"
          placeholder="E.g Common Enterance Prep"
        />
      </div>
    </div>
  );
}
