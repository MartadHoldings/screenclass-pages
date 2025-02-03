import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "antd";

export default function AddNew({ type }: { type: "subject" | "class" }) {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Add a new {type}</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Enter {type} name</Label>
        <Input
          type="text"
          id="class_name"
          placeholder="E.g Common Enterance Prep"
        />
      </div>

      {type === "subject" && (
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
      )}
    </div>
  );
}
