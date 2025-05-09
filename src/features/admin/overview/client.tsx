"use client";
import React from "react";
import Activities from "@/components/Activities";
import {
  ActivityProps,
  ChartsProps,
  StatsProps,
  StudentsData,
} from "@/types/queries";
import { Client } from "../students/Client";
import {
  UserSwitchOutlined,
  UserOutlined,
  ReadOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { Component } from "@/components/Charts";

export default function OverviewClient({
  statsData,
  studentsData,
  chartsData,
  activitesData,
}: {
  statsData: StatsProps;
  studentsData: StudentsData;
  chartsData: ChartsProps;
  activitesData: ActivityProps;
}) {
  const stats = [
    {
      label: "Total Students",
      count: statsData?.data.totalStudents,
      icon: (
        <UserOutlined
          style={{
            color: "#D745FCE5",
            padding: "10px",
            borderRadius: "100%",
            backgroundColor: "#FEE0FF",
          }}
        />
      ),
    },
    {
      label: "Total Guardian",
      count: statsData?.data.totalGuardians,
      icon: (
        <UserSwitchOutlined
          color=""
          style={{
            color: "#FC945A",
            backgroundColor: "#FFF1E0",
            padding: "10px",
            borderRadius: "100%",
          }}
        />
      ),
    },
    {
      label: "Total Classes",
      count: statsData?.data.totalClasses,
      icon: (
        <DesktopOutlined
          color=""
          style={{
            color: "#FC45C9E5",
            backgroundColor: "#FFE0EB",
            padding: "10px",
            borderRadius: "100%",
          }}
        />
      ),
    },
    {
      label: "Total Subjects",
      count: statsData?.data.totalSubjects,
      icon: (
        <ReadOutlined
          color=""
          style={{
            color: "#5AAEFC",
            backgroundColor: "#E0F9FF",
            padding: "10px",
            borderRadius: "100%",
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {stats.map((stat, index) => (
          <Col className="gutter-row" span={6} key={index}>
            <Card>
              <Statistic
                title={stat.label}
                value={stat.count}
                prefix={stat.icon}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-10 max-h-[600px]">
        <Row className="mt-10" gutter={20}>
          <Col span={18}>
            <Component chartsData={chartsData} />
          </Col>
          <Col span={6}>
            <Activities activitesData={activitesData} />
          </Col>
        </Row>
      </div>

      <Client studentsData={studentsData} />
    </>
  );
}
