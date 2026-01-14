import { Student } from "@/features/admin/students";
import React from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <Student searchParams={params} />;
}
