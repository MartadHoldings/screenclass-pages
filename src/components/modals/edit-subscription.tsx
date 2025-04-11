import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TableData } from "@/types";

export default function EditSubscription({
  editingRow,
}: {
  editingRow: TableData;
}) {
  return (
    <div className="space-y-3">
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="validity">Enter Valid Period</Label>
        <Input
          type="text"
          id="validity"
          placeholder="30 days"
          defaultValue={editingRow.validity}
        />
      </div>{" "}
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="plan_name">Enter Plan Name</Label>
        <Input
          type="text"
          id="plan_name"
          placeholder="Pro"
          defaultValue={editingRow.name}
        />
      </div>{" "}
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="price">Enter Price</Label>
        <Input
          type="text"
          id="price"
          placeholder="NGN 200"
          defaultValue={editingRow.price}
        />
      </div>
    </div>
  );
}
