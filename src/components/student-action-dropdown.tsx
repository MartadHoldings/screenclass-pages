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
import { TableData } from "@/types";
import { getStudentDetails } from "@/queries/students";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";

const actions = [
  {
    id: 1,
    label: "View Student Details",
  },
  { id: 2, label: "Suspend Student" },
  { id: 3, label: "Subscribe for Student" },
  { id: 4, label: "Subscription History" },
  { id: 5, label: "Delete Student" },
];

export function StudentActionDropdown({
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

    if (label === "View Student Details") {
      if (loadingAction !== null) return; // Prevent multiple clicks
      setLoadingAction(id as number);
      try {
        const response = await getStudentDetails(record.key as string);
        if (!response.success) {
          toast.error(response.message);
          return;
        } else {
          console.log(response.data);
          setUserDetails(response.data);
          setActiveDropDown({ id: record.key, label });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
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
          Manage Student
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
