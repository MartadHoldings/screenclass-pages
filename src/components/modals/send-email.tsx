import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function SendMail() {
  return (
    <div>
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="to">Recipient</Label>
        <Input type="text" id="to" placeholder="" />
      </div>
      <div className="my-5 grid w-full gap-2">
        <Label htmlFor="subject">Subject</Label>
        <Input type="text" id="subject" placeholder="" />
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
