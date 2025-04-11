"use client";
import React, { useState } from "react";
import Link from "next/link";

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
import { useAppContext } from "@/context/app-context";
import { TableData } from "@/types";
import { getGuardianDetails } from "@/queries/guardian";
import { toast } from "sonner";

const actions = [
  {
    id: 1,
    label: "View Guardian Details",
  },
  { id: 2, label: "Suspend Guardian" },
  { id: 3, label: "Delete Guardian" },
];

export function GuardianActionDropdown({
  children,
  record,
}: {
  children: React.ReactNode;
  record: TableData;
}) {
  const { setActiveDropDown } = useAppInteractionContext();

  const { setUserDetails } = useAppContext();

  const [loadingAction, setLoadingAction] = useState<number | null>(null);

  const handleSelect = async (e: Event, label: string, id?: number) => {
    e.preventDefault();

    if (label === "View Guardian Details") {
      if (loadingAction !== null) return; // Prevent multiple clicks
      setLoadingAction(id as number);
      try {
        const response = await getGuardianDetails(record.key as string);
        if (!response.success) {
          toast.error(response.message);
          return;
        } else {
          setUserDetails(response.data);
          console.log(response.data);
          setActiveDropDown({ id: record.key, label });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
        console.log(error);
      } finally {
        setLoadingAction(null);
      }
    } else {
      setActiveDropDown({ id: record.key as string, label });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-[0.9rem] font-bold text-blue-500">
          Manage Guardian
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {actions.map(({ id, label }) =>
            label === "Subscription History" ? (
              <DropdownMenuItem key={id} asChild>
                <Link
                  href={`/subscription-history/${record.user_id}`}
                  className="text-[0.9rem]"
                >
                  {label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={id}
                onSelect={(e) => handleSelect(e, label, id)}
                disabled={loadingAction === id}
              >
                <span className="text-[0.9rem]">
                  {loadingAction === id ? "Processing..." : label}
                </span>
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
