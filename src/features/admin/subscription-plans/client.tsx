"use client";
import DynamicTable from "@/components/tables/dynamic-data-table";
import {
  createSubscription,
  deletePlan,
  editSubscription,
} from "@/queries/subscription";
import { SubscriptionPlan } from "@/types/queries";
import { Modal, Button, Flex } from "antd";
import React, { useState } from "react";
import { toast } from "sonner";
import { CreateSubscription, TableData } from "@/types";
import EditSubscription from "@/components/modals/edit-subscription";

const initialState: CreateSubscription = {
  id: 0,
  name: "",
  validity: 0,
  price: "",
};

const initialType = "create";

export default function Client({
  subscriptionData,
}: {
  subscriptionData: SubscriptionPlan[];
}) {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [actionType, setActionType] = useState<"edit" | "create">(initialType);

  const [form, setForm] = useState(initialState);

  const onDelete = async (key: React.Key) => {
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

  const onEdit = (record: TableData | null) => {
    setForm({
      id: record?.key,
      name: record?.name,
      validity: record?.validity,
      price: record?.price,
    });
    setOpen(true);
    setActionType("edit");
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
      setOpen(false);
      setForm(initialState);
    }
  };

  const handleEditSubscription = async () => {
    setLoading(true);
    try {
      const res = await editSubscription(form);
      if (res.success) {
        console.log(res);
        toast.success(res.data?.message || "Subscription Edited");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
      setOpen(false);
      setForm(initialState);
      setActionType(initialType);
    }
  };

  const handleOk = () => {
    if (actionType === "create") {
      handleCreateSubscription();
    } else {
      handleEditSubscription();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setForm(initialState);
    setActionType(initialType);
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
          onClick={() => setOpen(true)}
        >
          Add New Subscription
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
        onEdit={onEdit}
      />

      <Modal
        open={open}
        onOk={handleOk}
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
