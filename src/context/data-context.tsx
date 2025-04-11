"use client";
import React, { createContext, useState, useContext } from "react";
import { DataType, TableData } from "@/types";

export type AddNew = {
  name: string;
  subjectId: string;
};

interface DataContextType {
  data: TableData[];
  setData: React.Dispatch<React.SetStateAction<TableData[]>>;
  editingRow: TableData | null;
  setEditingRow: React.Dispatch<React.SetStateAction<TableData[] | null>>;
  addNew: AddNew | null;
  setAddNew: React.Dispatch<React.SetStateAction<AddNew | null>>;
  deleteSelectedRows: DataType[];
  setDeleteSelectedRows: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<TableData[]>([]);

  const [editingRow, setEditingRow] = useState<TableData | null>(null);

  const [deleteSelectedRows, setDeleteSelectedRows] = useState<DataType[] | []>(
    [],
  );

  const [addNew, setAddNew] = useState<AddNew | null>(null);

  return (
    <DataContext.Provider
      value={{
        editingRow,
        data,
        setData,
        addNew,
        setAddNew,
        setEditingRow,
        deleteSelectedRows,
        setDeleteSelectedRows,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
