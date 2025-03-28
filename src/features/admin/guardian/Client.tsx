"use client";
import React from "react";
import { guardianData } from "@/data";
import { Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";

import {
  renderActionsModalGuardian,
  renderFooter,
} from "@/helpers/action-on-tables";
import DynamicTable from "@/components/tables/dynamic-data-table";

export const Client = () => {
  const { activeDropDown, setActiveDropDown } = useAppInteractionContext();
  const [loading, setLoading] = React.useState(false);

  const handleCancel = () => {
    setActiveDropDown(null);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setActiveDropDown(null);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <h2 className="text-[1.3rem] font-semibold">All Guardian</h2>

      <div className="mt-10">
        <DynamicTable
          data={guardianData}
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
