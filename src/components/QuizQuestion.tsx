"use client";
import React, { useState } from "react";
import { QuizQuestion } from "@/types";
import { Button, Popconfirm, RadioChangeEvent, message } from "antd";
import { Label } from "./ui/label";
import { useQuizForm } from "@/context/quiz-context";
import { Radio } from "antd";
import QuestionPreview from "./QuestionPreview";
import AddQuestion from "./AddQuestion";
import { generateUniqueId } from "@/helpers/generate-id";

const createNewDraftQuestion = (
  type: QuizQuestion["questionType"] = "MCQ",
): QuizQuestion => ({
  id: "",
  text: "",
  questionType: type,
  options: Array(type === "True/False" ? 2 : 4)
    .fill(null)
    .map(() => ({ text: "", isCorrect: false })),
});

const Quiz = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { state, dispatch } = useQuizForm();

  const [localDraft, setLocalDraft] = useState<QuizQuestion>(
    createNewDraftQuestion(),
  );

  const [showQuestions, setShowQuestions] = React.useState(true);

  const changeQuestionType = (e: RadioChangeEvent) => {
    const selectedType = e.target.value as QuizQuestion["questionType"];
    const optionCount = selectedType === "True/False" ? 2 : 4;

    setLocalDraft((prev) => {
      const updatedOptions = prev.options.slice(0, optionCount);

      // If options are fewer than needed, add new empty ones
      while (updatedOptions.length < optionCount) {
        updatedOptions.push({ text: "", isCorrect: false });
      }

      return {
        ...prev,
        questionType: selectedType,
        options: updatedOptions,
      };
    });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalDraft({ ...localDraft, text: e.target.value });
  };

  const handleSelectCorrect = (index: number) => {
    const updatedOptions = localDraft.options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));

    setLocalDraft((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const optionsTextChange = (index: number, value: string) => {
    const updatedOptions = localDraft.options.map((option, i) =>
      i === index ? { ...option, text: value } : option,
    );

    setLocalDraft((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const validateForm = (): string | false => {
    // Check if the question text is empty or just whitespace
    if (!localDraft.text.trim()) {
      return "Please enter a question.";
    }

    // Check if any of the options are empty or just whitespace
    if (localDraft.options.some((opt) => !opt.text.trim())) {
      return "Please fill in all options.";
    }

    // Check if at least one option is marked as correct
    if (!localDraft.options.some((opt) => opt.isCorrect)) {
      return "Please select the correct answer.";
    }

    // If all conditions are met, return false (no errors)
    return false;
  };

  const handleSave = () => {
    const newQuestion: QuizQuestion = {
      ...localDraft,
      id: generateUniqueId(),
    };

    dispatch({ type: "ADD_QUESTION", payload: newQuestion });
    message.success("Question Added to list");
    setLocalDraft(createNewDraftQuestion("MCQ"));
  };

  const handleOpenChange = (newOpen: boolean) => {
    const validationResult = validateForm();

    if (validationResult) {
      // If validation fails, show the error message
      message.warning(validationResult);
      return;
    } else {
      setShowPopup(newOpen);
    }
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "REMOVE_QUESTION", index: id });
  };

  return (
    <div className="w-full space-y-4 rounded-lg border p-4 shadow-sm">
      <p className="text-slate-600">
        Total Questions Added: {state.questions.length}
      </p>

      {state.questions.length > 0 && showQuestions && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Added Questions</h3>

          <div className="flex w-full flex-wrap gap-4">
            {state.questions.map((question) => (
              <QuestionPreview
                question={question}
                key={question.id}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-2 pb-2">
        <Label htmlFor="type">Question Type</Label>

        <Radio.Group
          value={localDraft.questionType}
          options={[
            { value: "MCQ", label: "Multi-choice" },
            { value: "True/False", label: "True or False" },
          ]}
          onChange={(e) => changeQuestionType(e)}
        />
      </div>

      <AddQuestion
        localDraft={localDraft}
        handleQuestionChange={handleQuestionChange}
        handleSelectCorrect={handleSelectCorrect}
        optionsTextChange={optionsTextChange}
      />

      <div className="flex items-center gap-3">
        <Popconfirm
          title="Are you sure you want to save this question?"
          onConfirm={handleSave}
          open={showPopup}
          onOpenChange={handleOpenChange}
          okText="Yes"
          cancelText="No"
        >
          <Button>Save Question</Button>
        </Popconfirm>
        <Button
          disabled={state.questions.length <= 0}
          onClick={() => setShowQuestions(!showQuestions)}
        >
          {!showQuestions ? "Show Questions" : "Hide Questions"}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
