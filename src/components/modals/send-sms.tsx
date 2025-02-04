import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function SendSms() {
  return (
    <div>
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="title">Subject</Label>
        <Input type="text" id="title" placeholder="" />
      </div>
      <div>
        <Label htmlFor="body">Message Body</Label>
        <Textarea
          className="resize-none"
          rows={10}
          placeholder="type here"
          id="body"
        />
      </div>
    </div>
  );
}
