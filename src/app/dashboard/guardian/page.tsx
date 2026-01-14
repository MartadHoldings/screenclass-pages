import { Guardian } from "@/features/admin/guardian";
import React from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <Guardian searchParams={params} />;
}
