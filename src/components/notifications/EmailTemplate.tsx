import React from "react";
import Image from "next/image";

export default function EmailTemplate({
  handleSelect,
}: {
  handleSelect: (value: "email") => void;
}) {
  return (
    <div
      className="flex h-[200px] max-w-[350px] cursor-pointer flex-col items-center justify-center gap-4 bg-[#ECDAFFCC]"
      onClick={() => handleSelect("email")}
    >
      <div className="flex size-[100px] items-center justify-center rounded-full bg-[#EDEAEA]">
        <Image
          src="/assets/email.svg"
          width={60}
          height={60}
          alt="email icon"
        />
      </div>
      <h3 className="text-xl">Create email notification</h3>
    </div>
  );
}
