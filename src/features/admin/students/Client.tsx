"use client";
import React from "react";
import { Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";

import {
  renderActionsModalStudent,
  renderFooter,
} from "@/helpers/action-on-tables";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { StudentsData } from "@/types/queries";
import { suspendStudent, deleteStudent } from "@/queries/students";
import { toast } from "sonner";
import { subscribeUser } from "@/queries/subscription";

export const Client = ({ studentsData }: { studentsData: StudentsData }) => {
  const { activeDropDown, setActiveDropDown, selectedPlan } =
    useAppInteractionContext();
  const [loading, setLoading] = React.useState(false);

  const handleCancel = () => {
    setActiveDropDown(null);
  };

  const handleOk = async () => {
    setLoading(true);

    if (activeDropDown?.label === "Suspend Student") {
      try {
        const response = await suspendStudent(activeDropDown.id);
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

    if (activeDropDown?.label === "Delete Student") {
      try {
        const response = await deleteStudent(activeDropDown.id);
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

    if (activeDropDown?.label === "Subscribe for Student") {
      const params = {
        userId: activeDropDown?.id,
        planId: selectedPlan,
      };
      try {
        const response = await subscribeUser({ params });
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
    return studentsData?.data?.users?.map((student) => {
      return {
        // id: index + 1,
        key: student._id,
        name: student.firstName + " " + student.lastName,
        user_id: student.scid,
        phone_number: student.mobile,
        reg_date: new Date(student.createdAt).toISOString().split("T")[0],
        email: student.email,
        level: student.level?.name,
      };
    });
  };

  return (
    <>
      <div className="mt-10">
        <DynamicTable
          data={extractData()}
          onAddContent={false}
          dropdownAction
          dropdownType="student"
        />{" "}
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
        {renderActionsModalStudent(activeDropDown)}
      </Modal>
    </>
  );
};
