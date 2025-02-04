import DynamicTable from "@/components/tables/dynamic-data-table";
import { notifications } from "@/data";
import React from "react";

export default function Client() {
  return (
    <>
      <p className="my-10 text-xl font-medium">All Messages</p>
      <DynamicTable data={notifications} />
    </>
  );
}
