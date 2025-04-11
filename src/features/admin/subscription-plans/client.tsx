"use client";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { useDataContext } from "@/context/data-context";
import { useAppInteractionContext } from "@/context/modal-state-context";
import { createSubscription, deletePlan } from "@/queries/subscription";
import { SubscriptionPlan } from "@/types/queries";
import { Modal, Button, Flex } from "antd";
import React, { useState } from "react";
import { toast } from "sonner";
import { CreateSubscription, TableData } from "@/types";
import EditSubscription from "@/components/modals/edit-subscription";

const initialState: CreateSubscription = {
  name: "",
  validity: 0,
  price: "",
};

export default function Client({
  subscriptionData,
}: {
  subscriptionData: SubscriptionPlan[];
}) {
  const [loading, setLoading] = useState(false);

  const [actionType, setActionType] = useState("create");

  const { editingRow, setEditingRow } = useDataContext();

  const { tableActionModal, setTableActionModal } = useAppInteractionContext();

  const [form, setForm] = useState(initialState);

  const onDelete = async (key: React.Key) => {
    // alert(key);
    try {
      const res = await deletePlan(key as string);
      if (res.success) {
        console.log(res);
        toast.success(res.data.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCreateSubscription = async () => {
    setLoading(true);
    try {
      const res = await createSubscription(form);
      console.log(res);
      if (res.success) {
        console.log(res);
        toast.success(res.data?.message || "Subscription Added");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
      setTableActionModal(null);
      setForm(initialState);
    }
  };

  const handleOk = () => {
    if (actionType === "create") {
      handleCreateSubscription();
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
    setTableActionModal(null);
    setForm(initialState);
  };

  const renderSubscriptionsFooter = () => {
    return (
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
          {actionType === "create" ? "Add Plan" : "Edit Plan"}
        </Button>
      </Flex>
    );
  };

  return (
    <>
      <div className="mt-5">
        <Button
          size="large"
          variant="solid"
          color="orange"
          onClick={() => setTableActionModal("add new class")}
        >
          Add New Level
        </Button>
      </div>
      <DynamicTable
        data={subscriptionData.map((planItem) => ({
          key: planItem._id,
          name: planItem.name,
          price: planItem.price,
          validity: planItem.validity,
          status: planItem.status,
        }))}
        onDelete={onDelete}
      />

      <Modal
        open={Boolean(tableActionModal !== null)}
        // onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderSubscriptionsFooter()}
      >
        <EditSubscription form={form} setForm={setForm} />
      </Modal>
    </>
  );
}
