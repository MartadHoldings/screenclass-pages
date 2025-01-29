import React from "react";

const labels = [
  { id: 1, label: "View Student Details" },
  { id: 2, label: "Suspend Student" },
  { id: 3, label: "Subscribe for Student" },
  { id: 4, label: "Subscription History" },
  { id: 5, label: "Delete Student" },
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

export function StudentActionDropdown({
  children,
}: {
  children: React.ReactNode;
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
          Manage Student
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {labels.map((label) => (
            <DropdownMenuItem
              key={label.id}
              asChild
              onSelect={(e) => handleSelect(e, label.label)}
            >
              <span className="text-[0.9rem]">{label.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
