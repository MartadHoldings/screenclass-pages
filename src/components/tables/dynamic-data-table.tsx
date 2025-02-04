"use client";
import React from "react";
import { Table, Button, Popconfirm, Divider, Tag } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { TableData } from "@/types";
import { GuardianActionDropdown } from "../guardian-action-dropdown";
import { StudentActionDropdown } from "../student-action-dropdown";

// Generic type for any table data

interface TableComponentProps<T extends TableData> {
  data: T[];
  onAddContent?: boolean;
  dropdownAction?: boolean;
  dropdownType?: "student" | "guardian";
  onEdit?: (record: T) => void;
  onDelete?: (key: React.Key) => void;
}

const DynamicTable = <T extends TableData>({
  data,
  onAddContent,
  dropdownAction,
  dropdownType,
  onEdit,
  onDelete,
}: TableComponentProps<T>) => {
  // Define columns explicitly without auto-generating from keys
  const columns: TableColumnsType<T> = [];

  const showTagColor = (value: string) => {
    const newVal = value.toLowerCase();

    switch (newVal) {
      case "pending":
        return "yellow";
      case "success":
        return "green";
      default:
        return "volcano";
    }
  };

  if (data.length) {
    const firstRow = data[0];
    Object.keys(firstRow).forEach((key) => {
      if (key !== "key") {
        // Exclude 'key' from being a column header
        columns.push({
          title: key.replace(/_/g, " ").toUpperCase(),
          dataIndex: key,
          key,
          render: (value) =>
            key === "status" ? (
              <Tag color={showTagColor(value)} key={value}>
                {value}
              </Tag>
            ) : (
              value
            ),
        });
      }
    });
  }

  // Add actions column if onEdit or onDelete exists
  if (onEdit || onDelete || onAddContent || dropdownAction) {
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
          {dropdownAction ? (
            dropdownType === "student" ? (
              <StudentActionDropdown record={record}>
                <EllipsisVertical />
              </StudentActionDropdown>
            ) : (
              <GuardianActionDropdown record={record}>
                <EllipsisVertical />
              </GuardianActionDropdown>
            )
          ) : null}
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
