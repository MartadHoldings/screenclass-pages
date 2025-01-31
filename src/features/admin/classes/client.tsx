"use client";
import React from "react";
import { Button } from "antd";
import AntDataTable from "@/components/tables/ant-data-table";
import { useAppInteractionContext } from "@/context/modal-state-context";

export default function Client() {
  const { setTableActionModal } = useAppInteractionContext();

  return (
    <>
      <div className="mt-5 flex w-full items-center justify-between">
        <Button
          color="danger"
          size="large"
          variant="solid"
          onClick={() => setTableActionModal("delete class")}
        >
          Delete
        </Button>
        <Button
          size="large"
          variant="solid"
          color="orange"
          onClick={() => setTableActionModal("add new class")}
        >
          Add new class
        </Button>
      </div>

      <div className="">
        <AntDataTable />
      </div>
    </>
  );
}
