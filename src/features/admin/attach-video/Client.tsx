"use client";

import React, { useState } from "react";
import { Select } from "antd";
import { getTopicsUnderSubject } from "@/queries/subjects";

export default function Client() {
  return (
    <>
      <div>
        <Select
          showSearch
          placeholder="Select a person"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "1", label: "Jack" },
            { value: "2", label: "Lucy" },
            { value: "3", label: "Tom" },
          ]}
        />
      </div>
    </>
  );
}
