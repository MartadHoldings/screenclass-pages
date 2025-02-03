import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function QuizQuestionInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="module_name">Question 1</Label>
      <Input
        placeholder="Enter the Title eg. Comprehension - The Fairy Tale"
        id="module_name"
        name="module_name"
        className="h-10"
      />
    </div>
  );
}
