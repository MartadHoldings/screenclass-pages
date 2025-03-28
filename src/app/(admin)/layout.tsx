import React from "react";
import AdminContent from "@/layout/AdminContent";
import { AppInteractionsContextProvider } from "@/context/modal-state-context";
import { DataProvider } from "@/context/data-context";
import { AppContextProvider } from "@/context/app-context";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppContextProvider>
        <AppInteractionsContextProvider>
          <DataProvider>
            <AdminContent>{children}</AdminContent>
          </DataProvider>
        </AppInteractionsContextProvider>
      </AppContextProvider>
    </>
  );
}
