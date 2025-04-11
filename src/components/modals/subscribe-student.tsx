"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getSubscriptionPlans } from "@/queries/subscription";
import { useAppInteractionContext } from "@/context/modal-state-context";

type Plan = {
  _id: string;
  name: string;
  validity: number;
  price: string;
};

export default function SubscribeStudent() {
  const [plans, setPlans] = useState<Plan[]>([]); // ✅ Fixed type

  const { selectedPlan, setSelectedPlan } = useAppInteractionContext();

  const fetchPlans = async () => {
    try {
      const res = await getSubscriptionPlans();
      if (res.success) {
        setPlans(
          res.data.map((plan) => ({
            _id: plan._id,
            name: plan.name,
            validity: plan.validity,
            price: plan.price,
          })),
        );
      } else {
        console.error("Error fetching plans:", res.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedPlan(value);
  };

  return (
    <div>
      <h2 className="text-base font-semibold">Subscribe Student</h2>

      <div className="mb-5 mt-10 space-y-1">
        <span>Choose plan</span>
        <Select
          style={{ width: "100%" }}
          onChange={handleChange}
          value={selectedPlan}
          options={plans.map((plan) => ({
            value: plan._id,
            label: `${plan.name} valid for ${plan.validity} days @ ${plan.price} NGN`,
          }))} // ✅ Fixed incorrect array wrapping
          placeholder="Select a plan"
        />
      </div>
    </div>
  );
}
