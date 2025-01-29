"use client";
import React from "react";
import { Modal } from "antd";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

        <div className="rounded-md bg-white px-3 pt-3">
          <div className="sticky top-0 flex h-8 w-full items-center justify-center border-b">
            <h4 className="text-center text-base font-medium">Activities</h4>
          </div>

          <div className="h-[270px] space-y-3 overflow-y-scroll px-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div className="flex items-end" key={i}>
                <div className="flex flex-col gap-1">
                  <span className="text-balance text-sm font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quia, eveniet ut. Esse?
                  </span>
                  <span className="text-[0.8rem] text-slate-500">
                    1 hour ago
                  </span>
                </div>
                <div className="size-3 shrink-0 rounded-full bg-blue-400"></div>
              </div>
            ))}
          </div>
        </div>
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
                    <EllipsisVertical onClick={showModal} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          {/* <TableFooter className="sticky bottom-0 bg-white">
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">
                {data?.pagination.totalCount}
              </TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
