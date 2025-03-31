"use client";
import "@ant-design/v5-patch-for-react-19";
import QuizSection from "@/components/QuizSection";
import { Label } from "@/components/ui/label";
import { Button, Input, Modal, Select } from "antd";
import { useParams, useRouter } from "next/navigation";

export const AddContent = () => {
  const params = useParams();

  const router = useRouter();

  const showModalConfirm = () => {
    Modal.confirm({
      title: "Confirm",
      content:
        "Ensure content is error free as fixes might not be possible, Are you sure to want to submit the following content ?",
      okText: "Yes, Submit",
      cancelText: "No, Cancel",
      onOk() {
        alert("submitted");
      },
      onCancel() {
        console.log("cancelled");
      },
    });
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <>
      <div>
        <h2 className="text-[1.3rem] font-semibold">Add content</h2>{" "}
        <p className="mt-3 font-medium text-slate-500">
          Here you can create and add content to like sub topics , videos,
          quizes to {params.slug}
        </p>
      </div>

      <section className="mt-10 space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">Sub Topic</h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="module_name">Name</Label>
          <Input
            placeholder="Enter the Title eg. Comprehension - The Fairy Tale"
            id="module_name"
            name="module_name"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="module_name">Description</Label>
          <Input
            placeholder="Enter a description"
            id="module_description"
            name="module_description"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="module_video">
            Video - Selected the correct video associated with the sub topic
          </Label>
          <Select
            style={{ width: "100%" }}
            placeholder="Select the video"
            showSearch
            optionFilterProp="label"
            onSearch={onSearch}
            options={[
              { value: "1", label: "Common Entrance Prep" },
              { value: "2", label: "Waec class" },
            ]}
          />{" "}
        </div>
      </section>

      <section className="mt-10 space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">Add Quiz to Sub topic</h2>
        </div>

        <div className="w-full">
          <p className="text-lg font-medium italic">How it works!!!</p>

          <ol className="list-inside list-decimal text-slate-500">
            <li>Enter the question in the input field.</li>
            <li>Fill in all four answer options.</li>
            <li>
              Select the correct answer by clicking the radio button next to it.
            </li>
            <li>Review the question and options to ensure accuracy.</li>
            <li>
              Click the &quot;Save Question&quot; button to store the question.
            </li>
            <li>Once saved, the form resets for adding a new question.</li>
          </ol>

          <QuizSection />
        </div>
      </section>

      <div className="flex items-center justify-center py-3">
        <Button
          type="primary"
          size="large"
          className="font-bold"
          onClick={showModalConfirm}
        >
          SUBMIT MATERIAL CONTENT
        </Button>
      </div>
    </>
  );
};
