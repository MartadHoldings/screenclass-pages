"use client";
import { Question } from "@/types";
import React, { useState } from "react";
import QuizQuestion from "./QuizQuestion";

const QuizSection = () => {
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
    console.log(questions);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(null);
  };

  return (
    <div className="w-full py-6">
      <QuizQuestion
        question={question}
        setQuestion={setQuestion}
        options={options}
        correctIndex={correctIndex}
        handleOptionChange={handleOptionChange}
        questions={questions}
        setCorrectIndex={setCorrectIndex}
        handleSave={handleSave}
      />
    </div>
  );
};

export default QuizSection;
