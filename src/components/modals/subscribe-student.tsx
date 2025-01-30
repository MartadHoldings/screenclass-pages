import React from "react";
import { Select } from "antd";

export default function SubscribeStudent() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <h2 className="text-base font-semibold">Subscribe Student</h2>

      <div className="mb-5 mt-10 space-y-1">
        <span>Choose plan</span>
        <Select
          defaultValue="200"
          style={{ width: "100%" }}
          onChange={handleChange}
          options={[
            { value: "200", label: "Montly - 200 NGN" },
            { value: "550", label: "Quaterly - 550 NGN" },
            { value: "2000", label: "Annually - 2000 NGN" },
            // { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
      </div>
    </div>
  );
}
