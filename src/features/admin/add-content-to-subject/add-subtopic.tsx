"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input, Select, Button, Modal, message } from "antd";
import { VideoData } from "@/types/queries";
import { addSubtopic } from "@/queries/subtopics";
import { toast } from "sonner";
import { OptionData } from "./Client";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { TextArea } = Input;

export interface SubtopicProps {
  name: string;
  description: string;
  videoLink: string;
  topicId: string;
}

export default function AddSubTopic({
  topics,
  videosData,
}: {
  topics: OptionData[] | null;
  videosData: VideoData | null;
}) {
  const [form, setForm] = useState<SubtopicProps>({
    name: "",
    description: "",
    videoLink: "",
    topicId: "",
  });

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (field: keyof SubtopicProps) => (value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value, // Dynamically update the selected field
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await addSubtopic({ form });

      if (response.success) {
        toast.success(response.data.message);
        setForm({ name: "", description: "", videoLink: "", topicId: "" });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModalConfirm = () => {
    if (!form.topicId.trim()) {
      message.warning("Select a topic");
      return;
    }
    if (!form.name.trim()) {
      message.warning("Please enter sub topic name");
      return;
    }
    if (!form.description.trim()) {
      message.warning("Please add description");
      return;
    }

    if (!form.videoLink.trim()) {
      message.warning("You can't create a sub topic without a video to attach");
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
    <>
      <section className="space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">Sub Topic</h2>
        </div>

        <form action="">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="module_topic">Topic</Label>
            <Select
              id="module-topic"
              showSearch
              placeholder="Select topic to add sub topic to"
              options={topics || undefined}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onSelect={handleSelect("topicId")}
              value={form.topicId || undefined}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="module_name">Name</Label>
            <Input
              placeholder="Enter the Title eg. Comprehension - The Fairy Tale"
              id="name"
              name="name"
              className="h-10"
              onChange={handleChange}
              value={form?.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="module_description">Description</Label>

            <TextArea
              showCount
              maxLength={200}
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="Enter a description"
              value={form.description}
              style={{ height: 100, resize: "none" }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="module_video">
              Video - Selected the correct video associated with the sub topic
            </Label>
            <Select
              style={{ width: "100%" }}
              placeholder="Select video"
              showSearch
              optionFilterProp="label"
              onSearch={onSearch}
              options={videosData?.data.map((topic) => ({
                label: topic.name,
                value: topic._id,
              }))}
              onSelect={handleSelect("videoLink")}
              value={form.videoLink || undefined}
            />{" "}
          </div>

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
      </section>
    </>
  );
}
