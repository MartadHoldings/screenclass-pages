import React from "react";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import { Button } from "../ui/button";
import Image from "next/image";

export default function HeaderContent() {
  return (
    <div className="flex h-full items-center justify-between px-6">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex h-fit w-fit items-center space-x-6">
        <Button size="icon" variant="outline">
          <SearchOutlined />
        </Button>
        <BellFilled
          size={50}
          style={{ fontSize: "24px", color: "#C5C7CD", cursor: "pointer" }}
        />
        <div className="h-8 w-[1px] shrink-0 border"></div>
        <div className="flex w-[180px] items-center justify-end space-x-2">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold">George Ann</span>
            <span className="text-sm font-semibold text-[#F7631B]">Admin</span>
          </div>
          <Image
            src="/assets/profile.png"
            alt="Admin profile photo"
            width={60}
            height={60}
            className="size-[60] shrink-0 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
