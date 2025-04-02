"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TableData } from "@/types";
import { useDataContext } from "@/context/data-context";

export default function AddTopic({
  editingRow,
}: {
  editingRow: TableData | null;
}) {
  const { addNew, setAddNew } = useDataContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddNew({ name: e.target.value, subjectId: editingRow?.key || "" });
  };

  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Add a new Topic</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Enter topic name</Label>
        <Input
          type="text"
          id="class_name"
          placeholder="Enter a topic"
          value={addNew?.name || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="space-y-1">
        <span>Add To</span>
        <Input
          type="text"
          id="class_name"
          value={editingRow?.subject}
          disabled
        />
      </div>
    </div>
  );
}
