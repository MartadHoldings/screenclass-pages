import React from "react";
import AdminContent from "@/layout/AdminContent";
import { AppInteractionsContextProvider } from "@/context/modal-state-context";
import { DataProvider } from "@/context/data-context";
import { AppContextProvider } from "@/context/app-context";
import { QuizFormProvider } from "@/context/quiz-context";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QuizFormProvider>
        <AppContextProvider>
          <AppInteractionsContextProvider>
            <DataProvider>
              <AdminContent>{children}</AdminContent>
            </DataProvider>
          </AppInteractionsContextProvider>
        </AppContextProvider>
      </QuizFormProvider>
    </>
  );
}
