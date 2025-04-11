"use client";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { useDataContext } from "@/context/data-context";
import { useAppInteractionContext } from "@/context/modal-state-context";
import {
  renderSubscriptionsFooter,
  renderSubscriptionsModal,
} from "@/helpers/action-on-tables";
import { TableData } from "@/types";
import { SubscriptionPlan } from "@/types/queries";
import { Modal, Button, Flex } from "antd";
import React, { useState } from "react";

export default function Client({
  subscriptionData,
}: {
  subscriptionData: SubscriptionPlan[];
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { editingRow, setEditingRow } = useDataContext();
  const { tableActionModal, setTableActionModal } = useAppInteractionContext();

  const onEdit = (record: TableData) => {
    setTableActionModal("edit subscription");
    setEditingRow(record);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setEditingRow(null);
    setTableActionModal(null);
  };

  return (
    <>
      <DynamicTable
        data={subscriptionData.map((planItem) => ({
          key: planItem._id,
          name: planItem.name,
          price: planItem.price,
          validity: planItem.validity,
          status: planItem.status,
        }))}
        onEdit={onEdit}
      />

      <Modal
        open={tableActionModal !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderSubscriptionsFooter({
          tableActionModal,
          handleCancel,
          loading,
          handleOk,
        })}
      >
        {renderSubscriptionsModal({ tableActionModal, editingRow })}
      </Modal>
    </>
  );
}
