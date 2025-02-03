"use client";
import React from "react";
import { Modal } from "antd";
import StatsCard from "@/components/StatsCards";
import { UserRound } from "lucide-react";

import { studentData } from "@/data";
import { useAppInteractionContext } from "@/context/modal-state-context";
// import UserInfo from "@/components/modals/user-info";
// import SubscribeStudent from "@/components/modals/subscribe-student";
// import DangerousActionModal from "@/components/modals/dangerous-action";
import Activities from "@/components/Activities";
// import DataTable from "@/components/tables/DataTable";
import {
  renderActionsModalStudent,
  renderFooter,
} from "@/helpers/action-on-tables";
import DynamicTable from "@/components/tables/dynamic-data-table";

const stats = [
  {
    label: "Active Students",
    count: 1200,
    icon: <UserRound />,
    bgColor: "#FEE0FF",
    textColor: "text-blue-800",
  },
  {
    label: "Total Subjects",
    count: 45,
    icon: <UserRound />,
    bgColor: "#FFF1E0",
    textColor: "text-green-800",
  },
  {
    label: "Total Guardian",
    count: 15,
    icon: <UserRound />,
    bgColor: "#FFE0EB",
    textColor: "text-yellow-800",
  },
  {
    label: "Total Classes",
    count: 15,
    icon: <UserRound />,
    bgColor: "#E0F9FF",
    textColor: "text-yellow-800",
  },
];

export const Overview = () => {
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
  //     case "View Student Details":
  //       return <UserInfo type="student" />;
  //     case "Suspend Student":
  //       return <DangerousActionModal actionType="suspend" user="student" />;
  //     case "Subscribe for Student":
  //       return <SubscribeStudent />;
  //     case "Delete Student":
  //       return <DangerousActionModal actionType="delete" user="student" />;
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            count={stat.count}
            icon={stat.icon}
            iconBgColor={stat.bgColor}
          />
        ))}
      </div>

      <div className="mt-10 grid h-[343px] grid-cols-[1.5fr_2fr_1.5fr] gap-4">
        <div className="bg-white p-3"></div>
        <div className="bg-white p-3"></div>
        <Activities />
      </div>

      <div className="mt-10">
        {/* <DataTable variant="student" data={studentData} /> */}

        <DynamicTable
          data={studentData}
          dropdownAction
          dropdownType="student"
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
        {renderActionsModalStudent(activeDropDown)}
      </Modal>
    </>
  );
};
