import { QuizQuestion } from "@/types";
import React, { useState } from "react";
import { CircleX } from "lucide-react";

export default function QuestionPreview({
  question,
  handleDelete,
}: {
  question: QuizQuestion;
  handleDelete: (id: string) => void;
}) {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const handleToggle = (index: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index],
    );
  };

  return (
    <>
      <div className="items relative mt-2 h-fit min-w-[150px] max-w-[500px] flex-col rounded-sm border-[1px] p-1 px-2">
        <small className="font-bold italic text-slate-500">
          {question.questionType}
        </small>
        <p
          className={`line-clamp-3 text-pretty text-sm font-medium ${
            expandedQuestions.includes(question.id ?? "")
              ? "line-clamp-none"
              : "line-clamp-3"
          }`}
        >
          {question.text}
        </p>
        <button
          type="button"
          className="block cursor-pointer font-medium text-blue-400 hover:underline"
          onClick={() => question.id !== undefined && handleToggle(question.id)}
        >
          {expandedQuestions.includes(question.id ?? "")
            ? "Collapse"
            : "Expand"}
        </button>
        <div className="mt-3 flex flex-wrap gap-2">
          {question.options.map((option, index) => (
            <span
              key={index}
              className={`${option.isCorrect ? "border-green-500" : ""} w-fit rounded-sm border-[1px] px-1 py-[2px]`}
            >
              {option.text}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="absolute -right-2 -top-3 z-10"
          onClick={() => question.id && handleDelete(question.id)}
        >
          <CircleX size={20} color="red" />
        </button>
      </div>
    </>
  );
}
