"use client";
import React from "react";
import { Button, Flex, Modal } from "antd";
import StatsCard from "@/components/StatsCards";
import { EllipsisVertical, UserRound } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { data } from "@/data";
import { StudentActionDropdown } from "@/components/student-action-dropdown";
import { useAppInteractionContext } from "@/context/modal-state-context";
import StudentInfo from "@/components/modals/student-info";
import SubscribeStudent from "@/components/modals/subscribe-student";
import DangerousActionModal from "@/components/modals/dangerous-action";
import Activities from "@/components/Activities";

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

  const renderActionsModal = (action: string | null) => {
    switch (action) {
      case "View Student Details":
        return <StudentInfo />;
      case "Suspend Student":
        return <DangerousActionModal type="suspend" />;
      case "Subscribe for Student":
        return <SubscribeStudent />;
      case "Delete Student":
        return <DangerousActionModal type="delete" />;
      default:
        return null;
    }
  };

  const renderFooter = (action: string | null) => {
    switch (action) {
      case "View Student Details":
        return (
          <Button
            key="back"
            onClick={handleCancel}
            size="large"
            className="w-full"
            type="primary"
          >
            Return
          </Button>
        );

      case "Suspend Student":
      case "Delete Student": // ✅ Uses the same footer for both cases
        return (
          <Flex gap="small">
            <Button
              key="back"
              onClick={handleCancel}
              size="large"
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
              size="large"
              className="w-full"
            >
              {action === "Suspend Student" ? "Suspend" : "Delete"}
            </Button>
          </Flex>
        );

      case "Subscribe for Student":
        return (
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
            size="large"
            className="w-full"
          >
            Subscribe
          </Button>
        );

      default:
        return null;
    }
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
        <Table className="w-full">
          <TableHeader className="sticky top-0 rounded-sm bg-[#E7E7F6] text-black">
            <TableRow>
              <TableHead className="w-[300px]">Full Name</TableHead>
              <TableHead className="">USER ID</TableHead>
              <TableHead className="">Phone Number</TableHead>
              <TableHead>Reg data</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {data &&
              data.map((user) => (
                <TableRow key={user.id} className="bg-white">
                  <TableCell className="w-[300px] font-medium">
                    {user.name.toUpperCase()}
                  </TableCell>
                  <TableCell className="">{user.user_id}</TableCell>
                  <TableCell className="">{user.phone_number}</TableCell>
                  <TableCell className="">{user.reg_date}</TableCell>
                  <TableCell className="">{user.email}</TableCell>
                  <TableCell className="">{user.class}</TableCell>
                  <TableCell className="cursor-pointer">
                    <StudentActionDropdown>
                      <EllipsisVertical />
                    </StudentActionDropdown>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        open={activeDropDown != null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderFooter(activeDropDown)}
      >
        {renderActionsModal(activeDropDown)}
      </Modal>
    </>
  );
};
