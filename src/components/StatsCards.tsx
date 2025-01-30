import React from "react";

type StatsCardProps = {
  label: string; // Label for the card, e.g., "Students"
  count: number | string; // Count or value to display
  icon: React.ReactNode; // Icon to display (e.g., from Ant Design or other libraries)
  iconBgColor?: string; // Optional: Background color
};

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  count,
  icon,
  iconBgColor,
}) => {
  return (
    <div
      className={`flex h-[110px] items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-md`}
    >
      <div
        className={`flex size-10 items-center justify-center rounded-full`}
        style={{ backgroundColor: iconBgColor }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold">{label}</h3>
        <span className="text-[1rem]">{count}</span>
      </div>
    </div>
  );
};

export default StatsCard;
