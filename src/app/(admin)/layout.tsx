import React from "react";
import AdminContent from "@/layout/AdminContent";
import { AppInteractionsContextProvider } from "@/context/modal-state-context";
import { DataProvider } from "@/context/data-context";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppInteractionsContextProvider>
        <DataProvider>
          <AdminContent>{children}</AdminContent>
        </DataProvider>
      </AppInteractionsContextProvider>
    </>
  );
}
