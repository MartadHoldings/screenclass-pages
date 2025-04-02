"use client";
import React from "react";
import { Button, Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { TableData } from "@/types";
import { useDataContext } from "@/context/data-context";
import {
  renderSubjectActionsModal,
  renderSubjectModalsFooter,
} from "@/helpers/action-on-tables";
import { SubjectsData } from "@/types/queries";
import { addTopicToSubject } from "@/queries/subjects";
import { toast } from "sonner";

export default function Client({
  subjectsData,
}: {
  subjectsData: SubjectsData;
}) {
  const { setTableActionModal, tableActionModal } = useAppInteractionContext();
  const { editingRow, setEditingRow, addNew, setAddNew } = useDataContext();
  const [loading, setLoading] = React.useState(false);

  const onEdit = (record: TableData) => {
    setEditingRow(record);
    setTableActionModal("edit subject cell");
    console.log("Edit clicked for: ", record);
  };

  const onDelete = (key: React.Key) => {
    // setData((prevData) => prevData.filter((item) => item.key !== key));
    alert(`you just deleted ${key}`);
  };

  const addTopic = (record: TableData) => {
    setTableActionModal("add topic to subject");
    setEditingRow(record);
  };

  const handleCancel = () => {
    setTableActionModal(null);
  };

  const handleOk = async () => {
    if (tableActionModal === "add topic to subject") {
      setLoading(true);
      try {
        const response = await addTopicToSubject({ form: addNew });
        if (!response.success) {
          toast.error(response.message);
          return;
        } else {
          toast.success(response.data?.message);
          console.log(response.data);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
        setTableActionModal(null);
        setAddNew({ name: "", subjectId: "" });
      }
    }
  };

  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between">
        <Button
          color="danger"
          size="large"
          variant="solid"
          onClick={() => setTableActionModal("delete subjects")}
        >
          Delete
        </Button>
        <Button
          size="large"
          variant="solid"
          color="orange"
          onClick={() => setTableActionModal("add new subject")}
        >
          Add new Subject
        </Button>
      </div>

      <div className="mt-10">
        {subjectsData?.data.map((data) => (
          <div key={data.id}>
            <h3 className="text-base font-semibold uppercase text-slate-600">
              {data.name}
            </h3>
            <div>
              <DynamicTable
                data={data.subjects.map((subject) => ({
                  key: subject._id,
                  subject: subject.name,
                  status: subject.status,
                  topics: subject.topics.length,
                }))}
                onAddContent
                addTopic={addTopic}
                // onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={tableActionModal !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderSubjectModalsFooter({
          tableActionModal,
          handleCancel,
          handleOk,
          loading,
        })}
      >
        {renderSubjectActionsModal({ tableActionModal, editingRow })}
      </Modal>
    </>
  );
}
