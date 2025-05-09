"use client";
import React from "react";
import { BellFilled } from "@ant-design/icons";
// import { Button } from "../ui/button";
import { Avatar } from "antd";
import { useAuthContext } from "@/context/auth-context";

export default function HeaderContent() {
  const { admin } = useAuthContext();
  return (
    <div className="flex h-full items-center justify-between px-6">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex h-fit w-fit items-center space-x-6">
        {/* <Button size="icon" variant="outline">
          <SearchOutlined />
        </Button> */}
        <BellFilled
          size={50}
          style={{ fontSize: "24px", color: "#C5C7CD", cursor: "pointer" }}
        />
        <div className="h-8 w-[1px] shrink-0 border"></div>
        <div className="flex w-[180px] items-center justify-end space-x-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold">{`${admin?.firstName} ${admin?.lastName}`}</span>
            <span className="text-sm font-semibold text-[#F7631B]">
              {admin?.role}
            </span>
          </div>
          <Avatar
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=6"
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
