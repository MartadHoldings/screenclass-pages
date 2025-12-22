import { QuizQuestion } from "@/types";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popconfirm } from "antd";

export default function QuestionPreview({
  question,
  handleDelete,
  variant,
}: {
  question: QuizQuestion;
  handleDelete: (id: string) => void;
  variant: "soft-delete" | "hard-delete";
}) {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [popupOpen, setPopupOpen] = useState(false);

  const questionId = question._id ?? "";

  const handleToggle = (index: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index],
    );
  };

  const renderDeleteBtn = () => {
    switch (variant) {
      case "hard-delete":
        return (
          <Popconfirm
            title="Are you sure you want to delete this question permanently?"
            open={popupOpen}
            onOpenChange={(open) => setPopupOpen(open)}
            onConfirm={() => {
              handleDelete(questionId);
              setPopupOpen(false);
            }}
            okText="Yes"
            cancelText="No"
            className="mt-4"
          >
            <Button size="sm" type="button" variant="destructive">
              Delete
            </Button>
          </Popconfirm>
        );
      default:
        return (
          <Button
            type="button"
            className="absolute -right-2 -top-3 z-10"
            onClick={() => handleDelete(questionId)}
            variant="outline"
            size="icon"
          >
            <Trash2 size={28} color="red" />
          </Button>
        );
    }
  };

  return (
    <div className="relative mt-2 h-fit min-w-[150px] max-w-[500px] flex-col rounded-sm border p-2">
      <small className="font-bold italic text-slate-500">
        {question.questionType}
      </small>

      <p
        className={`text-pretty text-sm font-medium ${
          expandedQuestions.includes(questionId)
            ? "line-clamp-none"
            : "line-clamp-3"
        }`}
      >
        {question.text}
      </p>

      <button
        type="button"
        className="block cursor-pointer font-medium text-blue-400 hover:underline"
        onClick={() => handleToggle(questionId)}
      >
        {expandedQuestions.includes(questionId) ? "Collapse" : "Expand"}
      </button>

      <div className="mt-3 flex flex-wrap gap-2">
        {question.options.map((option, index) => (
          <span
            key={index}
            className={`${
              option.isCorrect ? "border-green-500" : ""
            } w-fit rounded-sm border px-1 py-[2px]`}
          >
            {option.text}
          </span>
        ))}
      </div>

      <div className="mt-2">{renderDeleteBtn()}</div>
    </div>
  );
}
