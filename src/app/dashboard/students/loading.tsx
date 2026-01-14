"use client";
import React from "react";
import { Skeleton, Divider } from "antd";

export default function Loading() {
  return (
    <div>
      <Skeleton.Input active size="large" style={{ width: 200 }} />
      <div className="mt-10">
        <Divider />
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    </div>
  );
}
