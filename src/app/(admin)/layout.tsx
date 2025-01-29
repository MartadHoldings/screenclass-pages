import React from "react";
import AdminContent from "@/components/AdminContent";
import { AppInteractionsContextProvider } from "@/context/modal-state-context";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppInteractionsContextProvider>
        <AdminContent>{children}</AdminContent>
      </AppInteractionsContextProvider>
    </>
  );
}
