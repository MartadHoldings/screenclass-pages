import React from "react";
import { Card } from "./ui/card";

export default function Activities() {
  return (
    <Card className="relative h-full rounded-md px-3 pt-3">
      {/* Fixed Header Inside the Container */}
      <div className="sticky left-0 right-0 top-0 bg-white py-2 text-center text-lg font-semibold">
        Activities
      </div>

      {/* Scrollable Content */}
      <div className="h-[400px] space-y-3 overflow-y-auto px-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div className="flex items-end" key={i}>
            <div className="flex flex-col gap-1">
              <span className="text-balance text-sm font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                eveniet ut. Esse?
              </span>
              <span className="text-[0.8rem] text-slate-500">1 hour ago</span>
            </div>
            <div className="size-3 shrink-0 rounded-full bg-blue-400"></div>
          </div>
        ))}
      </div>
    </Card>
  );
}
