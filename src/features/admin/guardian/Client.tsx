"use client";
import React from "react";
import { Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";

import {
  renderActionsModalGuardian,
  renderFooter,
} from "@/helpers/action-on-tables";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { GuardianData } from "@/types/queries";
import { deleteGuardian, suspendGuardian } from "@/queries/guardian";
import { toast } from "sonner";

export const Client = ({ guardianData }: { guardianData: GuardianData }) => {
  const { activeDropDown, setActiveDropDown } = useAppInteractionContext();
  const [loading, setLoading] = React.useState(false);

  const handleCancel = () => {
    setActiveDropDown(null);
  };

  const handleOk = async () => {
    setLoading(true);

    if (activeDropDown?.label === "Suspend Guardian") {
      try {
        const response = await suspendGuardian(activeDropDown.id);
        console.log(response);
        if (!response.success) {
          toast.error(response.message);
          return;
        } else {
          toast.success(response.data.message);
          console.log(response);
          setActiveDropDown(null);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setActiveDropDown(null);
        setLoading(false);
      }
    }

    if (activeDropDown?.label === "Delete Guardian") {
      try {
        const response = await deleteGuardian(activeDropDown.id);
        console.log(response);
        if (!response.success) {
          toast.error(response.message);
          return;
        } else {
          toast.success(response.data.message);
          console.log(response);
          setActiveDropDown(null);
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setActiveDropDown(null);
        setLoading(false);
      }
    }
  };

  const extractData = () => {
    return guardianData?.data?.map((guardian) => {
      return {
        // id: index + 1,
        key: guardian._id,
        name: guardian.firstName + " " + guardian.lastName,
        user_id: guardian.scid,
        phone_number: guardian.mobile,
        reg_date: new Date(guardian.createdAt).toISOString().split("T")[0],
        email: guardian.email,
        status: guardian.status,
      };
    });
  };

  return (
    <>
      <h2 className="text-[1.3rem] font-semibold">All Guardian</h2>

      <div className="mt-10">
        <DynamicTable
          data={extractData()}
          dropdownAction
          dropdownType="guardian"
        />
      </div>

      <Modal
        open={activeDropDown != null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderFooter({
          activeDropDown,
          handleCancel,
          handleOk,
          loading,
        })}
      >
        {renderActionsModalGuardian(activeDropDown)}
      </Modal>
    </>
  );
};
