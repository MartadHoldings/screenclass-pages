"use client";
import React from "react";
import { Divider, Table, Button, Popconfirm } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useDataContext } from "@/context/data-context";
import { DataType } from "@/types";
import { Modal } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";
import {
  renderClassActionsModal,
  renderFooterClassModals,
} from "@/helpers/action-on-tables";

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>["rowSelection"] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows,
    );
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.class === "Disabled User", // Column configuration not to be checked
  //   name: record.class,
  // }),
};

const AntDataTable: React.FC = () => {
  const {
    data,
    setData,
    editingRow,
    setEditingRow,
    deleteSelectedRows,
    setDeleteSelectedRows,
  } = useDataContext();
  const { loading, tableActionModal, setLoading, setTableActionModal } =
    useAppInteractionContext();

  const onEdit = (record: DataType) => {
    setEditingRow(record);
    setTableActionModal("edit class cell");
    console.log("Edit clicked for: ", record);
    // Implement your edit logic here (e.g., open a modal with form fields)
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

  const deleteAllSelected = () => {
    set;
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Class",
      dataIndex: "class",
      // render: (text: string) => <a className="text-slate-500">{text}</a>,
    },
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "No of Subjects",
      dataIndex: "no_of_subject",
    },
    {
      title: "Update / Delete",
      render: (_text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit info
          </Button>
          <Popconfirm
            title="Are you sure you want to delete?"
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
      <div>
        <Divider />
        <Table<DataType>
          rowSelection={{ type: "checkbox", ...rowSelection }}
          columns={columns}
          dataSource={data}
        />
      </div>

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
