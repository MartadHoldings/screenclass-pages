import React from "react";
import Image from "next/image";

export default function DangerousActionModal({ type }: { type: string }) {
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
        Are you sure you want to {type} this user ? This action cannot be
        undone.
      </p>
    </div>
  );
}
