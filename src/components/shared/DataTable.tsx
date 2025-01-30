import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GuardianActionDropdown } from "../guardian-action-dropdown";
import { StudentActionDropdown } from "../student-action-dropdown";
import { EllipsisVertical } from "lucide-react";
import { Guardian, Student } from "@/types";

interface TablePropsType {
  variant: "student" | "guardian";
  data: Student[] | Guardian[];
}

export default function DataTable({ variant, data }: TablePropsType) {
  const ActionDropdown =
    variant === "guardian" ? GuardianActionDropdown : StudentActionDropdown;

  return (
    <>
      <Table className="w-full">
        <TableHeader className="sticky top-0 rounded-sm bg-[#E7E7F6] text-black">
          <TableRow>
            <TableHead className="w-[300px]">Full Name</TableHead>
            <TableHead className="">USER ID</TableHead>
            <TableHead className="">Phone Number</TableHead>
            <TableHead>Reg data</TableHead>
            <TableHead>Email Address</TableHead>
            {variant === "student" && <TableHead className="">Class</TableHead>}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data &&
            data.map((user) => (
              <TableRow key={user.id} className="bg-white">
                <TableCell className="w-[300px] truncate font-medium">
                  {user.name.toUpperCase()}
                </TableCell>
                <TableCell className="">{user.user_id}</TableCell>
                <TableCell className="">{user.phone_number}</TableCell>
                <TableCell className="">{user.reg_date}</TableCell>
                <TableCell className="">{user.email}</TableCell>
                {variant === "student" && "class" in user && (
                  <TableCell>{user.class}</TableCell>
                )}
                <TableCell className="cursor-pointer">
                  <ActionDropdown>
                    <EllipsisVertical />
                  </ActionDropdown>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
