import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DataType } from "@/types";

interface EditClassProps {
  editingRow: DataType | null;
}

export default function EditClass({ editingRow }: EditClassProps) {
  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Edit Class</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Change Class name</Label>
        <Input
          type="text"
          id="class_name"
          placeholder="E.g Common Enterance Prep"
        />
      </div>
    </div>
  );
}
