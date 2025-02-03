"use client";
import React from "react";
import { Divider, Table, Button, Popconfirm, Modal } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useDataContext } from "@/context/data-context";
import { DataType, SubjDataType } from "@/types";
import { useAppInteractionContext } from "@/context/modal-state-context";
import {
  renderClassActionsModal,
  renderFooterClassModals,
} from "@/helpers/action-on-tables";
import Link from "next/link";

const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
};

const AntDataTable: React.FC<{ data: any; type: "class" | "subject" }> = ({
  data,
  type,
}) => {
  const { setData, editingRow, setEditingRow } = useDataContext();
  const { loading, tableActionModal, setLoading, setTableActionModal } =
    useAppInteractionContext();

  const onEdit = (record: DataType | SubjDataType) => {
    setEditingRow(record);
    setTableActionModal("edit class cell");
    console.log("Edit clicked for: ", record);
  };

  const onDelete = (key: React.Key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
    alert(`you just deleted ${key}`);
  };

  const handleCancel = () => {
    setTableActionModal(null);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setTableActionModal(null);
      setLoading(false);
    }, 2000);
  };

  const classColumns: TableColumnsType<DataType> = [
    { title: "Class", dataIndex: "class" },
    { title: "ID", dataIndex: "id" },
    { title: "No of Subjects", dataIndex: "no_of_subject" },
    {
      title: "Update / Delete",
      render: (_text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit info
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => onDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const subjColumns: TableColumnsType<SubjDataType> = [
    { title: "Subject", dataIndex: "subject" },
    { title: "Subject code", dataIndex: "subject_code" },
    { title: "No of topics", dataIndex: "number_of_topics" },
    {
      title: "Update / Delete",
      render: (_text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit info
          </Button>
          <Button type="primary">
            <Link href={`/subjects-content/${record.key}`}>Add Content</Link>
            Add content
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => onDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Divider />
      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={type === "class" ? classColumns : subjColumns}
        dataSource={data}
      />
      <Modal
        open={tableActionModal !== null}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        centered
        footer={renderFooterClassModals({
          tableActionModal,
          handleCancel,
          handleOk,
          loading,
        })}
      >
        {renderClassActionsModal({ tableActionModal, editingRow })}
      </Modal>
    </>
  );
};

export default AntDataTable;
