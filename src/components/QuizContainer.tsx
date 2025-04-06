"use client";
import { Question } from "@/types";
import React, { useState, useTransition } from "react";
import Quiz from "./QuizQuestion";
import { Label } from "@/components/ui/label";
import { Select, Button, Modal, Input } from "antd";
import { OptionData } from "@/features/admin/add-content-to-subject/Client";
import { getSubtopics } from "@/queries/subtopics";
import { toast } from "sonner";
import { useQuizForm } from "@/context/quiz-context";
import { createQuizToSubtopic } from "@/queries/quizez";

const QuizContainer = ({ topics }: { topics: OptionData[] | null }) => {
  const [subtopics, setSubtopics] = useState<OptionData[] | null>(null);

  const [isPending, startTransition] = useTransition();

  const { state, dispatch } = useQuizForm();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_DURATION", payload: parseInt(e.target.value) });
  };

  const handleSubTopicId = (value: string) => [
    dispatch({ type: "SET_SUBTOPIC_ID", payload: value }),
  ];

  const selectTopic = (value: string) => {
    fetchSubtopics(value);
  };

  const fetchSubtopics = async (id: string) => {
    try {
      const response = await getSubtopics(id);

      if (response.success) {
        setSubtopics(
          response.data.data.map((subtopic) => ({
            label: subtopic.name,
            value: subtopic._id,
          })),
        );
      } else {
        console.log(response.message);
        // toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    startTransition(async () => {
      try {
        const modifiedState = {
          ...state,
          questions: state.questions.map(({ id, ...rest }) => rest), // Remove 'id' from each question
        };

        const response = await createQuizToSubtopic(modifiedState);

        if (response.success) {
          toast.success(response.data?.message);
          dispatch({ type: "RESET_FORM" });
          console.log(response.data);
        } else {
          toast.error(response.message);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const showModalConfirm = () => {
    Modal.confirm({
      title: "Confirm",
      content:
        "Ensure content is error free as fixes might not be possible, Are you sure to want to submit the following content ?",
      okText: "Yes, Submit",
      cancelText: "No, Cancel",
      onOk() {
        handleSubmit();
      },
      okButtonProps: { loading: isPending },
    });
  };

  return (
    <form className="w-full space-y-6 px-4">
      <div className="border-b py-3">
        <h2 className="text-xl font-medium">Add Quiz to Sub topic</h2>
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
          // value={form.topicId}
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
          // value={form.topicId}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="module_title">Quiz Title</Label>
        <Input
          id="module-title"
          name="title"
          placeholder="Enter this quiz title "
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="module_duration">
          Quiz Duration - will be regarded in minutes
        </Label>
        <Input
          type="number"
          id="module-duration"
          name="duration"
          placeholder="10 "
          onChange={handleDurationChange}
        />
      </div>

      <Quiz />

      <div className="mt-10 flex items-center justify-center py-3">
        <Button
          type="primary"
          size="large"
          className="font-bold"
          onClick={showModalConfirm}
        >
          SUBMIT MATERIAL CONTENT
        </Button>
      </div>
    </form>
  );
};

export default QuizContainer;
