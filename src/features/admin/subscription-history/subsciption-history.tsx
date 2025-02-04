"use client";
import DynamicTable from "@/components/tables/dynamic-data-table";
import { payments } from "@/data";
import { useParams } from "next/navigation";
import React from "react";

export const SubscriptionHistory = () => {
  const params = useParams();
  return (
    <div>
      <h2 className="text-[1.3rem] font-semibold">
        Subscription History for {params.slug}
      </h2>

      <DynamicTable data={payments} />
    </div>
  );
};
