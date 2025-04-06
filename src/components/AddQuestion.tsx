import React from "react";
import { Input, Radio } from "antd";
import { QuizQuestion } from "@/types";

const { TextArea } = Input;

export default function AddQuestion({
  localDraft,
  handleQuestionChange,
  handleSelectCorrect,
  optionsTextChange,
}: {
  localDraft: QuizQuestion;
  handleQuestionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectCorrect: (index: number) => void;
  optionsTextChange: (index: number, value: string) => void;
}) {
  return (
    <>
      <TextArea
        autoSize={{ minRows: 2, maxRows: 6 }}
        typeof="text"
        value={localDraft.text}
        onChange={handleQuestionChange}
        placeholder="Enter your question"
      />
      <div className="space-y-2">
        {localDraft.options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <Radio
              name="correctOption"
              checked={option.isCorrect}
              onChange={() => handleSelectCorrect(index)}
            />
            <Input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                optionsTextChange(index, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
