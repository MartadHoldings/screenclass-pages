import React from "react";
import { UserRound } from "lucide-react";

const studentDetails = [
  { label: "Class", value: "Common Ent Prep" },
  { label: "Phone number", value: "+2349157505114" },
  { label: "Email Address", value: "test@gmail.com" },
  { label: "Student ID", value: "SCS112" },
  { label: "Plan", value: "Premium" },
  { label: "Plan Deal", value: "7 days" },
  { label: "Expiry Date", value: "soon" },
  { label: "Last Login", value: "20/06/2023 at 04:00:22pm" },
  { label: "Guardian", value: "Debbie Ann" },
  { label: "Subjects", value: "English Language, Mathematics, Basic Science" },
  { label: "Status", value: "Active", valueClass: "text-green-600" },
];

export default function StudentInfo() {
  return (
    <div>
      {" "}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Temilolas Details</h2>
          <button className="text-xl">&times;</button>
        </div>

        <div className="mb-4 flex items-center">
          <div className="w-[30%]">
            <div className="flex size-[100px] items-center justify-center rounded-full bg-gray-200">
              <UserRound size={50} />
            </div>
          </div>

          <div className="w-[70%]">
            <h3 className="text-xl font-semibold">Temilola Ann</h3>
            <p className="text-orange-500">Student</p>
            <p className="text-balance text-xs text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Curabitur velit euismod
              gravida fringilla lacus malesuada. Sed eget praesent.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {studentDetails.map(({ label, value, valueClass = "" }, index) => (
            <div key={index} className="flex gap-2">
              <div className="flex w-[30%] justify-end">
                <span className="text-right text-sm font-semibold">
                  {label}:
                </span>
              </div>
              <div className="flex w-[70%] justify-start">
                <span className={`text-left text-xs ${valueClass}`}>
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
