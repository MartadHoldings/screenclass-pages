import React from "react";
import Image from "next/image";

type ModalProps = {
  actionType: "suspend" | "delete";
  user: "student" | "guardian";
};

export default function DangerousActionModal({ actionType, user }: ModalProps) {
  const gifSrc =
    actionType === "suspend" ? "/assets/loading.gif" : "/assets/delete.gif";

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={gifSrc}
        alt="loading gif"
        width={150}
        height={150}
        unoptimized
        className={`${actionType === "suspend" ? "scale-150" : "scale-95"}`}
      />
      <p className="w-[70%] text-center">
        Are you sure you want to {actionType} this {user}? This action cannot be
        undone.
      </p>
    </div>
  );
}
