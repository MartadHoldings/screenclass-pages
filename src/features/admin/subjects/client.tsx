"use client";
import React from "react";
import { Button, Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";
import { subjectData } from "@/data";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { TableData } from "@/types";
import { useDataContext } from "@/context/data-context";
import {
  renderSubjectActionsModal,
  renderSubjectModalsFooter,
} from "@/helpers/action-on-tables";

export default function Client() {
  const { setTableActionModal, tableActionModal } = useAppInteractionContext();
  const { editingRow, setEditingRow } = useDataContext();
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

  const handleCancel = () => {
    setTableActionModal(null);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setTableActionModal(null);
      setLoading(false);
    }, 2000);
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
        {subjectData.map((data) => (
          <div key={data.id}>
            <h3 className="text-base font-semibold uppercase text-slate-600">
              {data.class}
            </h3>
            <div>
              {/* <AntDataTable data={data.subjects} type="subject" /> */}
              <DynamicTable
                data={data.subjects}
                onAddContent
                onEdit={onEdit}
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
