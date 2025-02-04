import React from "react";
import Image from "next/image";

export default function SmsTemplate({
  handleSelect,
}: {
  handleSelect: (value: "sms") => void;
}) {
  return (
    <div
      className="flex h-[200px] max-w-[350px] cursor-pointer flex-col items-center justify-center gap-4 bg-[#FCDAFFCC]"
      onClick={() => handleSelect("sms")}
    >
      <div className="flex size-[100px] items-center justify-center rounded-full bg-[#EDEAEA]">
        <Image src="/assets/sms.svg" width={60} height={60} alt="email icon" />
      </div>
      <h3 className="text-xl">Create sms notification</h3>
    </div>
  );
}
