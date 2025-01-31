"use client";
import React, { createContext, useState, useContext } from "react";
import { DataType } from "@/types";

interface DataContextType {
  data: DataType[];
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  editingRow: DataType | null;
  setEditingRow: (row: DataType | null) => void;
  deleteSelectedRows: DataType[];
  setDeleteSelectedRows: React.Dispatch<React.SetStateAction<DataType[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DataType[]>([
    { key: "1", class: "Common Entrance Prep", id: "Exam", no_of_subject: 20 },
    { key: "2", class: "Common Entrance Prep", id: "Exam", no_of_subject: 10 },
    { key: "3", class: "Common Entrance Prep", id: "Exam", no_of_subject: 70 },
    { key: "4", class: "Disabled User", id: 99, no_of_subject: 2 },
  ]);

  const [editingRow, setEditingRow] = useState<DataType | null>(null);
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
