"use client";
import React from "react";
import Link from "next/link";

const labels = [
  { id: 1, label: "View Guardian Details" },
  { id: 2, label: "Suspend Guardian" },
  { id: 4, label: "Subscription History" },
  { id: 5, label: "Delete Guardian" },
];

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppInteractionContext } from "@/context/modal-state-context";
import { TableData } from "@/types";

export function GuardianActionDropdown({
  children,
  record,
}: {
  children: React.ReactNode;
  record: TableData;
}) {
  const { setActiveDropDown } = useAppInteractionContext();
  const handleSelect = (e: Event, label: string) => {
    e.preventDefault();
    setActiveDropDown(label);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-[0.9rem] font-bold text-blue-500">
          Manage Guardian
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {labels.map((label) =>
            label.label === "Subscription History" ? (
              <DropdownMenuItem key={label.id} asChild>
                <Link
                  href={`/subscription-history/${record.user_id}`}
                  className="text-[0.9rem]"
                >
                  {label.label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={label.id}
                asChild
                onSelect={(e) => handleSelect(e, label.label)}
              >
                <span className="text-[0.9rem]">{label.label}</span>
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
