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
import {
  addTopicToSubject,
  deleteTopicFrmSubj,
  deleteSubject,
} from "@/queries/subjects";
import { toast } from "sonner";

export default function Client({
  subjectsData,
}: {
  subjectsData: SubjectsData;
}) {
  const {
    setTableActionModal,
    tableActionModal,
    setSelectedPlan,
    selectedPlan,
  } = useAppInteractionContext();
  const { editingRow, setEditingRow, addNew, setAddNew } = useDataContext();
  const [loading, setLoading] = React.useState(false);

  const onDelete = async (key: React.Key) => {
    try {
      const response = await deleteSubject(key as string);
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
    }
  };

  const addTopic = (record: TableData) => {
    setTableActionModal("add topic to subject");
    setEditingRow(record);
  };

  const deleteTopic = (Key: React.Key) => {
    setTableActionModal("delete topic");
    setEditingRow({ key: Key });
  };

  const handleAddTopic = async () => {
    if (!addNew?.name) {
      toast.warning("Enter a topic name");
      return;
    }
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
      setEditingRow(null);
    }
  };

  const handleDeleteTopic = async () => {
    if (!selectedPlan) {
      toast.warning("No plan selected. Please select a plan.");
      return;
    }
    setLoading(true);
    try {
      const response = await deleteTopicFrmSubj(selectedPlan);
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
      handleCancel();
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setTableActionModal(null);
    // setAddNew({ name: "", subjectId: "" });
  };

  const handleOk = async () => {
    switch (tableActionModal) {
      case "add topic to subject":
        await handleAddTopic();
        break;

      case "delete topic":
        await handleDeleteTopic();
        break;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between">
        {/* <Button
          color="danger"
          size="large"
          variant="solid"
          onClick={() => setTableActionModal("delete subjects")}
        >
          Delete
        </Button> */}
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
          <div key={data._id}>
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
                onDeleteTopic={deleteTopic}
                addTopic={addTopic}
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
        {renderSubjectActionsModal({
          tableActionModal,
          editingRow,
        })}
      </Modal>
    </>
  );
}
