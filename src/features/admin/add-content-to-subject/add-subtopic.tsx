"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input, Select, Button, Modal } from "antd";
import { VideoData } from "@/types/queries";
import { addSubtopic } from "@/queries/subtopics";
import { getTopicsUnderSubject } from "@/queries/subjects";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const { TextArea } = Input;

export interface SubtopicProps {
  name: string;
  description: string;
  videoLink: string;
  topicId: string;
}

export type OptionData = {
  label: string;
  value: string;
};

export default function AddSubTopic({
  videosData,
}: {
  videosData: VideoData | null;
}) {
  const [form, setForm] = useState<SubtopicProps>({
    name: "",
    description: "",
    videoLink: "",
    topicId: "",
  });
  const [topics, setTopics] = useState<OptionData[] | null>(null);

  const params = useParams();

  const fetchTopicsViaParams = async () => {
    try {
      const response = await getTopicsUnderSubject(params.slug as string);

      if (response.success) {
        setTopics(
          response.data.data.map((topic) => ({
            label: topic.name,
            value: topic._id,
          })),
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopicsViaParams();
  }, []);

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
        toast.success(response.message);
        setForm({ name: "", description: "", videoLink: "", topicId: "" });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
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
    });
  };
  return (
    <>
      <section className="space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">Sub Topic</h2>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="module_topic">Topic</Label>
          <Select
            id="module-topic"
            showSearch
            placeholder="Select topic to add sub topic to"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={topics || undefined}
            onSelect={handleSelect("topicId")}
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
            // value={form?.videoLink}
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
      </section>
    </>
  );
}
