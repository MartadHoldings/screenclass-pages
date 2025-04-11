"use client";
import React from "react";
import StatsCard from "@/components/StatsCards";
import { UsersRound, BookOpenText, GraduationCap } from "lucide-react";

import Activities from "@/components/Activities";

import { StatsProps, StudentsData } from "@/types/queries";

import { Client } from "../students/Client";

export default function OverviewClient({
  statsData,
  studentsData,
}: {
  statsData: StatsProps;
  studentsData: StudentsData;
}) {
  const stats = [
    {
      label: "Total Students",
      count: statsData?.data.totalStudents,
      icon: <UsersRound color="#D745FCE5" />,
      bgColor: "#FEE0FF",
    },
    {
      label: "Total Guardian",
      count: statsData?.data.totalGuardians,
      icon: <UsersRound color="#FC945A" />,
      bgColor: "#FFF1E0",
    },
    {
      label: "Total Classes",
      count: statsData?.data.totalClasses,
      icon: <GraduationCap color="#FC45C9E5" />,
      bgColor: "#FFE0EB",
    },
    {
      label: "Total Subjects",
      count: statsData?.data.totalSubjects,
      icon: <BookOpenText color="#5AAEFC" />,
      bgColor: "#E0F9FF",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            count={stat.count}
            icon={stat.icon}
            iconBgColor={stat.bgColor}
          />
        ))}
      </div>

      <div className="mt-10 grid h-[343px] grid-cols-[1.5fr_2fr_1.5fr] gap-4">
        <div className="bg-white p-3"></div>
        <div className="bg-white p-3"></div>
        <Activities />
      </div>

      <Client studentsData={studentsData} />
    </>
  );
}
