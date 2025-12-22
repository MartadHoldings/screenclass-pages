"use client";
import { QuizProps } from "@/types";
import QuestionPreview from "./QuestionPreview";
import { useState } from "react";

export default function AvailableQuestionsContainer({
  quizObj,
  deleteQuestion,
}: {
  quizObj: QuizProps;
  deleteQuestion: (quizId: string | undefined, questionId: string) => void;
}) {
  const quizQuestions = quizObj?.questions;

  const handleDelete = (id: string) => {
    if (!quizObj._id) return;
    deleteQuestion(quizObj._id, id);
  };

  return (
    <div className="w-full space-y-4 rounded-lg border p-4 shadow-sm">
      <h1 className="text-lg font-bold">Remove Question from Quiz</h1>
      <p className="font-medium text-slate-600">
        Total Existing Questions: {quizQuestions?.length}
      </p>

      {quizQuestions?.length > 0 && (
        <div className="mt-6 grid w-full grid-cols-3 gap-4">
          {quizQuestions.map((question) => (
            <QuestionPreview
              key={question._id}
              question={question}
              handleDelete={handleDelete}
              variant="hard-delete"
            />
          ))}
        </div>
      )}
    </div>
  );
}
