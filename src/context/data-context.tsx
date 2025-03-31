"use client";
import React, { createContext, useState, useContext } from "react";
import { DataType, TableData } from "@/types";

interface DataContextType {
  data: TableData[];
  setData: React.Dispatch<React.SetStateAction<TableData[]>>;
  editingRow: TableData | null;
  setEditingRow: (row: TableData | null) => void;
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

  return (
    <DataContext.Provider
      value={{
        editingRow,
        data,
        setData,
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
