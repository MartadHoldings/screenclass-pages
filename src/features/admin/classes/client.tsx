"use client";
import React from "react";
import { Button, Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { TableData } from "@/types";
import { useDataContext } from "@/context/data-context";
import {
  renderClassActionsModal,
  renderClassModalsFooter,
} from "@/helpers/action-on-tables";

export default function Client() {
  const { setTableActionModal, tableActionModal } = useAppInteractionContext();
  const { data, editingRow, setEditingRow } = useDataContext();
  const [loading, setLoading] = React.useState(false);

  const onEdit = (record: TableData) => {
    setEditingRow(record);
    setTableActionModal("edit class cell");
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
          onClick={() => setTableActionModal("delete classes")}
        >
          Delete
        </Button>
        <Button
          size="large"
          variant="solid"
          color="orange"
          onClick={() => setTableActionModal("add new class")}
        >
          Add new Class
        </Button>
      </div>

      <div className="mt-10">
        <DynamicTable data={data} onEdit={onEdit} onDelete={onDelete} />
      </div>

      <Modal
        open={tableActionModal !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderClassModalsFooter({
          tableActionModal,
          handleCancel,
          handleOk,
          loading,
        })}
      >
        {renderClassActionsModal({ tableActionModal, editingRow })}
      </Modal>
    </>
  );
}
