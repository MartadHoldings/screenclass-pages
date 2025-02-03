"use client";
import React from "react";
// import DataTable from "@/components/tables/DataTable";
import { guardianData } from "@/data";
import { Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";
// import UserInfo from "@/components/modals/user-info";
// import DangerousActionModal from "@/components/modals/dangerous-action";
import {
  renderActionsModalGuardian,
  renderFooter,
} from "@/helpers/action-on-tables";
import DynamicTable from "@/components/tables/dynamic-data-table";

export const Guardian = () => {
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

  // const renderActionsModal = (action: string | null) => {
  //   switch (action) {
  //     case "View Guardian Details":
  //       return <UserInfo type="guardian" />;
  //     case "Suspend Guardian":
  //       return <DangerousActionModal actionType="suspend" user="guardian" />;
  //     case "Delete Guardian":
  //       return <DangerousActionModal actionType="delete" user="guardian" />;
  //     default:
  //       return null;
  //   }
  // };

  // const renderFooter = (action: string | null) => {
  //   switch (action) {
  //     case "View Student Details":
  //       return (
  //         <Button
  //           key="back"
  //           onClick={handleCancel}
  //           size="large"
  //           className="w-full"
  //           type="primary"
  //         >
  //           Return
  //         </Button>
  //       );

  //     case "Suspend Student":
  //     case "Delete Student": // ✅ Uses the same footer for both cases
  //       return (
  //         <Flex gap="small">
  //           <Button
  //             key="back"
  //             onClick={handleCancel}
  //             size="large"
  //             className="w-full"
  //           >
  //             Cancel
  //           </Button>
  //           <Button
  //             key="submit"
  //             type="primary"
  //             loading={loading}
  //             onClick={handleOk}
  //             size="large"
  //             className="w-full"
  //           >
  //             {action === "Suspend Student" ? "Suspend" : "Delete"}
  //           </Button>
  //         </Flex>
  //       );

  //     case "Subscribe for Student":
  //       return (
  //         <Button
  //           key="submit"
  //           type="primary"
  //           loading={loading}
  //           onClick={handleOk}
  //           size="large"
  //           className="w-full"
  //         >
  //           Subscribe
  //         </Button>
  //       );

  //     default:
  //       return null;
  //   }
  // };
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
