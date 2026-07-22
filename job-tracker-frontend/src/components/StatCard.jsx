import React from "react";

function StatCard({ title, value, color }) {
  const colors = {
    blue: "border-blue-500",
    gray: "border-gray-500",
    yellow: "border-yellow-500",
    green: "border-green-500",
    red: "border-red-500",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow p-6 border-l-4 ${colors[color]}`}
    >
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default React.memo(StatCard);