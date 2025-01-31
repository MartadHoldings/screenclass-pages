import Image from "next/image";
import React from "react";

export default function DeleteActionModal({ variant }: { variant: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <Image
        src="/assets/delete.gif"
        alt="delete gif"
        width={150}
        height={150}
      />

      <p className="w-[70%] text-center">
        Are you sure you want to delete this {variant}? This action cannot be
        undone.
      </p>
    </div>
  );
}
