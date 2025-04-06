"use client";
import React from "react";
import { UserRound } from "lucide-react";
import { useAppContext } from "@/context/app-context";

export default function UserInfo() {
  const { userDetails } = useAppContext();

  const { mobile, email, scid, guardian, status, level, firstName, lastName } =
    userDetails || {};
  // console.log("info", userDetails);

  const formattedData = [
    {
      label: "Mobile",
      value: mobile || "N/A",
    },
    {
      label: "Email",
      value: email || "N/A",
    },
    {
      label: "ID",
      value: scid || "N/A",
    },
    {
      label: "Name",
      value:
        firstName && lastName
          ? `${userDetails?.firstName} ${userDetails?.lastName}`
          : "N/A",
    },
    { label: "Level", value: level?.name || "N/A" },
    { label: "Status", value: status || "N/A" },
    {
      label: "Guardian Name",
      value:
        guardian?.firstName && guardian?.lastName
          ? `${guardian.firstName} ${guardian.lastName}`
          : "No guardian",
    },
  ];

  // console.log(formattedData);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold">
          {`${userDetails?.firstName + "'s"} Details`}
        </h2>
      </div>
      <div className="mb-4 flex items-center">
        <div className="w-[30%]">
          <div className="flex size-[100px] items-center justify-center rounded-full bg-gray-200">
            <UserRound size={50} />
          </div>
        </div>

        <div className="w-[70%] space-y-3">
          <h3 className="text-xl font-semibold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</h3>
          <p className="text-orange-500">{userDetails?.role}</p>
        </div>
      </div>
      <div className="space-y-3">
        {formattedData.map(({ label, value }, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex w-[30%] justify-end">
              <span className="text-right text-sm font-semibold">{label}:</span>
            </div>
            <div className="flex w-[70%] justify-start">
              <span
                className={`text-left text-xs ${value === "enabled" && "text-green-500"}`}
              >
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
