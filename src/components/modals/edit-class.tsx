import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TableData } from "@/types";

interface EditClassProps {
  type: "class" | "subject";
  editingRow: TableData | null;
}

export default function EditClass({ editingRow, type }: EditClassProps) {
  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Edit {type}</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Change {type} name</Label>
        <Input
          type="text"
          id="class_name"
          placeholder={
            type === "class" ? "E.g Common Enterance Prep" : "E.g Mathematics"
          }
        />
      </div>
    </div>
  );
}
