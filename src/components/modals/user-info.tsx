import React from "react";
import { UserRound } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { StudentProps } from "@/types/queries";

const guardianDetails = [
  { label: "Phone number", value: "+2349157505114" },
  { label: "Email Address", value: "test@gmail.com" },
  { label: "User ID", value: "SCS112" },
  { label: "Plan", value: "Premium" },
  { label: "Date registered", value: "yesterday" },
  { label: "Last Login", value: "20/06/2023 at 04:00:22pm" },
  { label: "Student", value: "Debbie Ann and 3 others" },
  {
    label: "Status",
    value: "Active",
    valueClass: "text-green-600 font-bold text-[15px]",
  },
];

export default function UserInfo() {
  const { userDetails } = useAppContext();

  const { mobile, email, scid, guardian, status, level } =
    (userDetails?.data as StudentProps) || {};

  const formattedData = [
    { label: "Level", value: level?.name },
    { label: "Phone number", value: mobile },
    { label: "Email Address", value: email },
    { label: "User ID", value: scid },
    {
      label: "Guardian",
      value: guardian
        ? `${guardian.firstName} ${guardian.lastName}`
        : "No guardian",
    },
    {
      label: "Subjects",
      value: "English Language, Mathematics, Basic Science",
    },
    { label: "Status", value: status },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <h2 className="text-lg font-semibold">
          {`${userDetails?.data.firstName + "'s"} Details`}
        </h2>
      </div>
      <div className="mb-4 flex items-center">
        <div className="w-[30%]">
          <div className="flex size-[100px] items-center justify-center rounded-full bg-gray-200">
            <UserRound size={50} />
          </div>
        </div>

        <div className="w-[70%]">
          <h3 className="text-xl font-semibold">{`${userDetails?.data.firstName} ${userDetails?.data.lastName}`}</h3>
          <p className="text-orange-500">{}</p>
          {/* <p className="text-balance text-xs text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Curabitur velit euismod
            gravida fringilla lacus malesuada. Sed eget praesent.
          </p> */}
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
