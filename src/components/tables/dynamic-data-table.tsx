"use client";
import React from "react";
import { Table, Button, Popconfirm, Divider } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import Link from "next/link";
import { TableData } from "@/types";

// Generic type for any table data

interface TableComponentProps<T extends TableData> {
  data: T[];
  onAddContent?: boolean;
  onEdit?: (record: T) => void;
  onDelete?: (key: React.Key) => void;
}

const DynamicTable = <T extends TableData>({
  data,
  onAddContent,
  onEdit,
  onDelete,
}: TableComponentProps<T>) => {
  // Generate columns dynamically from data keys
  const columns: TableColumnsType<T> = data.length
    ? Object.keys(data[0]).map((key) => ({
        title: key.replace(/_/g, " ").toUpperCase(),
        dataIndex: key,
        key,
      }))
    : [];

  // Add actions column if onEdit or onDelete exists
  if (onEdit || onDelete || onAddContent) {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_text, record) => (
        <div className="flex gap-2">
          {onEdit && (
            <Button type="primary" onClick={() => onEdit(record)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => onDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          )}
          {onAddContent && (
            <Button type="primary">
              <Link href={`/subjects-content/${record.key}`}>Add Content</Link>
            </Button>
          )}
        </div>
      ),
    });
  }

  const rowSelection: TableProps<T>["rowSelection"] = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log("Selected Rows: ", selectedRows);
    },
  };

  return (
    <>
      <Divider />
      <Table
        dataSource={data}
        columns={columns}
        rowSelection={{ type: "checkbox", ...rowSelection }}
      />
    </>
  );
};

export default DynamicTable;
