"use client";
import React from "react";
import { Question } from "@/types";
import { Button, Input, Popconfirm } from "antd";
import { Trash2, CircleX } from "lucide-react";

const { TextArea } = Input;

interface QuizQuestionProps {
  questions: Question[];
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  correctIndex: number | null;
  setCorrectIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleOptionChange: (index: number, value: string) => void;
  handleSave: () => void;
  handleDelete: (id: number) => void;
}

type TextExpand = {
  id: number;
  expand: false;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questions,
  setCorrectIndex,
  question,
  setQuestion,
  options,
  correctIndex,
  handleOptionChange,
  handleSave,
  handleDelete,
}) => {
  const [showQuestions, setShowQuestions] = React.useState(true);
  const [expandedQuestions, setExpandedQuestions] = React.useState<number[]>(
    [],
  );
  const handleToggle = (id: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id],
    );
  };

  return (
    <div className="w-full space-y-4 rounded-lg border p-4 shadow-sm">
      <p className="text-slate-600">
        Total Questions Added: {questions.length}
      </p>

      {questions.length > 0 && showQuestions && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Added Questions</h3>

          <div className="flex w-full flex-wrap gap-4">
            {questions.map((q) => (
              <div
                key={q.id}
                className="items relative mt-2 h-fit min-w-[150px] max-w-[500px] flex-col rounded-sm border-[1px] p-1 px-2"
              >
                <p
                  className={`${expandedQuestions.includes(q.id) ? "line-clamp-2" : "line-clamp-none"} line-clamp-3 text-pretty text-sm font-medium`}
                >
                  {q.question}
                </p>
                <button
                  className="block cursor-pointer font-medium text-blue-400 hover:underline"
                  onClick={() => handleToggle(q.id)}
                >
                  {expandedQuestions.includes(q.id) ? "Expand" : "Collapse"}
                </button>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((option, index) => (
                    <span
                      key={index}
                      className={`${q.correctIndex === index ? "border-green-500" : ""} w-fit rounded-sm border-[1px] px-1 py-[2px]`}
                    >
                      {option}
                    </span>
                  ))}
                </div>
                <button
                  className="absolute -right-2 -top-3 z-10"
                  onClick={() => handleDelete(q.id)}
                >
                  <CircleX size={20} color="red" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <TextArea
        autoSize={{ minRows: 2, maxRows: 6 }}
        typeof="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
      />
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name="correctOption"
              checked={correctIndex === index}
              onChange={() => setCorrectIndex(index)}
            />
            <Input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Popconfirm
          title="Are you sure you want to save this question?"
          onConfirm={handleSave}
          okText="Yes"
          cancelText="No"
        >
          <Button>Save Question</Button>
        </Popconfirm>
        <Button
          disabled={questions.length <= 0}
          onClick={() => setShowQuestions(!showQuestions)}
        >
          {!showQuestions ? "Show Questions" : "Hide Questions"}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;
