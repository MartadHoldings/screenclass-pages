import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CreateSubscription, TableData } from "@/types";

type ComponentType = {
  form: CreateSubscription;
  setForm: React.Dispatch<React.SetStateAction<CreateSubscription>>;
};

export default function EditSubscription({ form, setForm }: ComponentType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="space-y-3">
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="validity">Enter Valid Period</Label>
        <Input
          type="number"
          id="validity"
          placeholder="30 days"
          name="validity"
          value={form.validity || ""}
          onChange={handleChange}
        />
      </div>{" "}
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="plan_name">Enter Plan Name</Label>
        <Input
          type="text"
          id="plan_name"
          placeholder="Pro"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
        />
      </div>{" "}
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="price">Enter Price</Label>
        <Input
          type="text"
          id="price"
          name="price"
          placeholder="NGN 200"
          value={form.price || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
