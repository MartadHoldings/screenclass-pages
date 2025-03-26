"use client";
import React from "react";
import { Modal } from "antd";
import StatsCard from "@/components/StatsCards";
import { UsersRound, BookOpenText, GraduationCap } from "lucide-react";

import { studentData } from "@/data";
import { useAppInteractionContext } from "@/context/modal-state-context";

import Activities from "@/components/Activities";
import {
  renderActionsModalStudent,
  renderFooter,
} from "@/helpers/action-on-tables";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { StatsProps } from "@/types/queries";

export default function Client({ statsData }: { statsData: StatsProps }) {
  const stats = [
    {
      label: "Total Students",
      count: statsData.data.totalStudents,
      icon: <UsersRound color="#D745FCE5" />,
      bgColor: "#FEE0FF",
    },
    {
      label: "Total Guardian",
      count: statsData.data.totalGuardians,
      icon: <UsersRound color="#FC945A" />,
      bgColor: "#FFF1E0",
    },
    {
      label: "Total Classes",
      count: statsData.data.totalClasses,
      icon: <GraduationCap color="#FC45C9E5" />,
      bgColor: "#FFE0EB",
    },
    {
      label: "Total Subjects",
      count: statsData.data.totalSubjects,
      icon: <BookOpenText color="#5AAEFC" />,
      bgColor: "#E0F9FF",
    },
  ];
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
}
