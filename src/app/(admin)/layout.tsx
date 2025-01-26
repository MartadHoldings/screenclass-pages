import React from "react";
import AdminContent from "@/components/AdminContent";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminContent>{children}</AdminContent>
    </>
  );
}
