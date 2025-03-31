import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TableData } from "@/types";

export default function AddTopic({
  editingRow,
}: {
  editingRow: TableData | null;
}) {
  return (
    <div className="">
      <h2 className="text-[1.3rem] font-medium">Add a new Topic</h2>

      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="class_name">Enter topic name</Label>
        <Input type="text" id="class_name" placeholder="Enter a topic" />
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
