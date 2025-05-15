import React from "react";
import { Card } from "./ui/card";
import { ActivityProps } from "@/types/queries";
import { formatDistanceToNow } from "date-fns";

export default function Activities({
  activitesData,
}: {
  activitesData: ActivityProps;
}) {
  return (
    <Card className="relative h-full rounded-md px-3 pt-3">
      <div className="sticky left-0 right-0 top-0 bg-white py-2 text-center text-lg font-semibold">
        Activities
      </div>

      <div className="h-[300px] space-y-3 overflow-y-auto px-4">
        {activitesData?.data.map((notif) => (
          <div className="flex items-end" key={notif.message}>
            <div className="flex flex-col gap-1">
              <span className="text-balance text-sm font-medium text-blue-500">
                {notif.message}
              </span>
              <span className="text-[0.8rem] text-slate-500">
                {" "}
                {formatDistanceToNow(new Date(notif.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
