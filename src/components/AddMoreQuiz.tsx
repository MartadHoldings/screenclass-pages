"use client";
import React, { useEffect, useState, useCallback } from "react";
import { OptionData } from "@/features/admin/add-content-to-subject/Client";
import Quiz from "./QuizQuestion";
import { Label } from "@/components/ui/label";
import { Select, Button, Modal, message } from "antd";
import { useQuizForm } from "@/context/quiz-context";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useSubtopics } from "@/hooks/useSubtopics";
import { addMoreQuiz, hasQuiz } from "@/queries/quizez";
import { toast } from "sonner";

export default function AddMoreQuiz({
  topics,
}: {
  topics: OptionData[] | null;
}) {
  const [quizPresent, setQuizPresent] = useState(false);

  const { state, dispatch } = useQuizForm();

  const { subtopics, fetchSubtopics, loading } = useSubtopics();

  const handleSubTopicId = (value: string) => [
    dispatch({ type: "SET_SUBTOPIC_ID", payload: value }),
  ];

  const selectTopic = (value: string) => {
    fetchSubtopics(value);
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const checkQuiz = useCallback(async () => {
    if (!state.subTopicId) return;
    const response = await hasQuiz(state.subTopicId);
    if (response.success) {
      setQuizPresent(response.data.hasQuiz);
      if (response.data.hasQuiz) {
        message.success("You can add more quiz here");
      } else {
        message.error(
          "You can't add more quiz here yet, Use the create quiz tab",
        );
      }
    }
  }, [state.subTopicId]);

  useEffect(() => {
    checkQuiz();
  }, [checkQuiz]);

  const handleSubmit = async () => {
    try {
      const modifiedState = {
        subTopicId: state.subTopicId,
        questions: state.questions.map(({ id, ...rest }) => rest), // Remove 'id' from each question
      };

      const response = await addMoreQuiz(modifiedState);

      if (response.success) {
        toast.success(response.data?.message);
        setQuizPresent(false);
        resetForm();
      } else {
        toast.error(response.message);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const showModalConfirm = () => {
    if (!state.subTopicId.trim()) {
      message.warning("Please enter a sub topic");
      return;
    }

    if (!state.questions || state.questions.length === 0) {
      message.warning("Please add at least one question to the quiz");
      return;
    }

    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleFilled />,
      content:
        "Ensure content is error free as fixes might not be possible. Are you sure you want to submit?",
      okText: "Yes, Submit",
      cancelText: "No, Cancel",
      onOk: async () => {
        // Returning a Promise that resolves/rejects controls modal behavior
        return handleSubmit();
      },
    });
  };

  return (
    <form className="w-full space-y-6 px-4">
      <div className="border-b py-3">
        <h2 className="text-xl font-medium">Add More Quiz to Sub topic</h2>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="module_topic">Topic</Label>
        <Select
          id="module-topic"
          showSearch
          placeholder="Select topic to add sub topic to"
          options={topics || undefined}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={selectTopic}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="module_subtopic">Select Sub Topic</Label>
        <Select
          id="module-topic"
          showSearch
          placeholder="Select topic to add sub topic to"
          options={subtopics || undefined}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onSelect={handleSubTopicId}
          value={state.subTopicId || undefined}
        />
      </div>

      <Quiz />

      <div className="mt-10 flex items-center justify-center py-3">
        <Button
          type="primary"
          size="large"
          className="font-bold"
          onClick={showModalConfirm}
          disabled={quizPresent === false}
        >
          SUBMIT MATERIAL CONTENT
        </Button>
      </div>
    </form>
  );
}
