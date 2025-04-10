"use client";
import EditSubscription from "@/components/modals/edit-subscription";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { subscriptions } from "@/data";
import { TableData } from "@/types";
import { Modal, Button, Flex } from "antd";
import React, { useState } from "react";

export default function Client() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onEdit = (record: TableData) => {
    setOpen(true);
    console.log();
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <DynamicTable data={subscriptions} onEdit={onEdit} />

      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        title="Edit Plan"
        centered
        footer={
          <Flex gap="small">
            <Button
              key="back"
              onClick={handleCancel}
              className="w-full"
              size="large"
            >
              Cancel
            </Button>

            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              className="w-full"
              size="large"
            >
              Edit Plan
            </Button>
          </Flex>
        }
      >
        <EditSubscription />
      </Modal>
    </>
  );
}
