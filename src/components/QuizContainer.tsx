"use client";
import { ExclamationCircleFilled } from "@ant-design/icons";
import React from "react";
import Quiz from "./QuizQuestion";
import { Label } from "@/components/ui/label";
import { Select, Button, Modal, Input, message, Spin } from "antd";
import { OptionData } from "@/features/admin/add-content-to-subject/Client";
// import { getSubtopics } from "@/queries/subtopics";
import { toast } from "sonner";
import { useQuizForm } from "@/context/quiz-context";
import { createQuizToSubtopic } from "@/queries/quizez";
import { useSubtopics } from "@/hooks/useSubtopics";

const QuizContainer = ({ topics }: { topics: OptionData[] | null }) => {
  // const [subtopics, setSubtopics] = useState<OptionData[] | null>(null);

  const { subtopics, fetchSubtopics, loading } = useSubtopics();

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

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  // const fetchSubtopics = async (id: string) => {
  //   try {
  //     const response = await getSubtopics(id);

  //     if (response.success) {
  //       setSubtopics(
  //         response.data.data.map((subtopic) => ({
  //           label: subtopic.name,
  //           value: subtopic._id,
  //         })),
  //       );
  //     } else {
  //       console.log(response.message);
  //       toast.error(response.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (topicId) {
  //     fetchSubtopics(topicId);
  //   }
  // }, [topicId]);

  const handleSubmit = async () => {
    try {
      const modifiedState = {
        ...state,
        questions: state.questions.map(({ id, ...rest }) => rest), // Remove 'id' from each question
      };

      const response = await createQuizToSubtopic(modifiedState);

      if (response.success) {
        toast.success(response.data?.message);
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
    if (!state.title.trim()) {
      message.warning("Please enter a title");
      return;
    }

    if (!state.duration) {
      message.warning("Add the quiz duration");
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
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="module_subtopic">Select Sub Topic</Label>

        <Spin spinning={loading}>
          <Select
            id="module-topic"
            showSearch
            placeholder="Select topic to add sub topic to"
            options={!loading ? subtopics : []}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onSelect={handleSubTopicId}
            value={state.subTopicId || undefined}
            style={{ width: "100%" }}
          />
        </Spin>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="module_title">Quiz Title</Label>
        <Input
          id="module-title"
          name="title"
          placeholder="Enter this quiz title "
          onChange={handleTitleChange}
          value={state.title || undefined}
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
          placeholder="10"
          onChange={handleDurationChange}
          value={state.duration || undefined}
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
          SUBMIT CONTENT MATERIAL
        </Button>
      </div>
    </form>
  );
};

export default QuizContainer;
