"use client";
import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { useAppInteractionContext } from "@/context/modal-state-context";
import { getTopicsUnderSubject } from "@/queries/subjects";
import { TableData } from "@/types";
import { OptionData } from "@/features/admin/add-content-to-subject/Client";

export default function DeleteTopic({
  editingRow,
}: {
  editingRow: TableData | null;
}) {
  const [topics, setTopics] = useState<OptionData[]>([]); // ✅ type just contains label and data
  const [loading, setLoading] = useState(false); // 🌀 loading state

  const { selectedPlan, setSelectedPlan } = useAppInteractionContext();

  useEffect(() => {
    if (!editingRow?.key) return;

    const fetchTopics = async () => {
      try {
        setLoading(true);
        const res = await getTopicsUnderSubject(editingRow.key);
        if (res.success) {
          setTopics(
            res.data.data.map((topic) => ({
              label: topic.name,
              value: topic._id,
            })),
          );
        } else {
          console.error("Error fetching topics:", res.message);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
    setSelectedPlan(""); // reset selection whenever the modal is opened or row changes
  }, [editingRow, setSelectedPlan]);

  const handleSelect = (value: string) => {
    setSelectedPlan(value);
  };

  return (
    <div>
      <h2 className="text-base font-semibold">Delete Topic</h2>

      <div className="my-5 space-y-1">
        <span>Select topic</span>
        {loading ? (
          <Spin className="mt-2 block" />
        ) : (
          <Select
            id="topic"
            showSearch
            style={{ width: "100%" }}
            placeholder="Select topic to delete"
            options={topics}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            value={selectedPlan || undefined}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
}
