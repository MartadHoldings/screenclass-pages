"use client";
import QuizSection from "@/components/QuizSection";
import { Label } from "@/components/ui/label";
import UploadComponent from "@/components/UploadComponent";
import { Button, Input, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";

export const AddContent = () => {
  const params = useParams();

  const router = useRouter();

  const showModalConfirm = () => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure to want to submit the following content ?",
      okText: "Yes, Submit",
      cancelText: "No, Cancel",
      onOk() {
        router.push("/");
      },
      onCancel() {
        console.log("cancelled");
      },
    });
  };

  return (
    <>
      <div>
        <h2 className="text-[1.3rem] font-semibold">Add content</h2>{" "}
        <p className="mt-3 font-medium text-slate-500">
          Here you can create and add content to like videos, quizes and pdfs to{" "}
          {params.slug}
        </p>
      </div>

      <section className="mt-10 space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">Module</h2>
        </div>

        <div className="space-y-2">
          <Label htmlFor="module_name">Module Name</Label>
          <Input
            placeholder="Enter the Title eg. Comprehension - The Fairy Tale"
            id="module_name"
            name="module_name"
            className="h-10"
          />
        </div>

        <UploadComponent label="Upload Notes PDF" />

        <UploadComponent label="Uplaod Video or Media file" />
      </section>

      <section className="mt-10 space-y-6 bg-white px-4 py-3">
        <div className="border-b py-3">
          <h2 className="text-xl font-medium">
            Add Quiz Via File or Create them manually
          </h2>
        </div>

        <UploadComponent label="Import Quiz CSV file" />

        <div className="w-full">
          <h2 className="mb-4 text-xl font-semibold">Add Manually</h2>

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
