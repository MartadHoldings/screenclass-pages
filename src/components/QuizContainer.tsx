"use client";
import { Question } from "@/types";
import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion";

const QuizContainer = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      alert("Please fill in all options.");
      return;
    }
    if (correctIndex === null) {
      alert("Please select the correct answer.");
      return;
    }

    const newQuestion: Question = {
      id: questions.length + 1,
      question,
      options,
      correctIndex,
    };

    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
  };

  const handleDelete = (id: number) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div className="w-full py-6">
      <QuizQuestion
        question={question}
        setQuestion={setQuestion}
        questions={questions}
        options={options}
        correctIndex={correctIndex}
        setCorrectIndex={setCorrectIndex}
        handleOptionChange={handleOptionChange}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default QuizContainer;
