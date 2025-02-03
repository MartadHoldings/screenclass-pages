"use client";
import React from "react";
import { Question } from "@/types";
import { Button, Input, Popconfirm } from "antd";

interface QuizQuestionProps {
  questions: Question[];
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  correctIndex: number | null;
  setCorrectIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleOptionChange: (index: number, value: string) => void;
  handleSave: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questions,
  setCorrectIndex,
  question,
  setQuestion,
  options,
  correctIndex,
  handleOptionChange,
  handleSave,
}) => {
  const [showQuestions, setShowQuestions] = React.useState(true);
  return (
    <div className="w-full space-y-4 rounded-lg border p-4 shadow-sm">
      <p className="text-slate-600">
        Total Questions Added: {questions.length}
      </p>

      {questions.length > 0 && showQuestions && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Added Questions:</h3>
          <ol className="list-decimal pl-5 text-slate-500">
            {questions.map((q) => (
              <li key={q.id} className="mt-2">
                {q.question} (Correct Answer: {q.options[q.correctIndex]})
              </li>
            ))}
          </ol>
        </div>
      )}

      <Input
        type="text"
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
