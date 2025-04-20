"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "antd";
import { Createsubject } from "@/types";

const initialState: Createsubject = {
  name: "",
  classId: "",
};

export default function AddNewSubject() {
  const [form, setForm] = useState(initialState);

  const handleChange = (value: string) => {
    setForm({ ...form, classId: value });
  };

  const handleFetchClasses = () => {};

  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Add a new Subject</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Enter Subject name</Label>
        <Input
          type="text"
          id="class_name"
          placeholder="E.g Common Enterance Prep"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <span>Add To</span>
        <Select
          defaultValue="1"
          style={{ width: "100%" }}
          onChange={handleChange}
          options={[
            { value: "1", label: "Common Entrance Prep" },
            { value: "2", label: "Waec class" },
            // { value: "2000", label: "Annually - 2000 NGN" },
            // { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </div>
    </div>
  );
}
