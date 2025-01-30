import React from "react";
import Image from "next/image";

type ModalProps = {
  actionType: "suspend" | "delete";
  user: "student" | "guardian";
};

export default function DangerousActionModal({ actionType, user }: ModalProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/assets/loading.gif"
        alt="loading gif"
        width={150}
        height={150}
        className="scale-150"
      />
      <p className="w-[70%] text-center">
        Are you sure you want to {actionType} this {user}? This action cannot be
        undone.
      </p>
    </div>
  );
}
