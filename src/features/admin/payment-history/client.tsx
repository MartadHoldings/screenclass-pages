import DynamicTable from "@/components/tables/dynamic-data-table";
import { payments } from "@/data";
import React from "react";

export default function Client() {
  return (
    <div>
      <DynamicTable data={payments} />
    </div>
  );
}
