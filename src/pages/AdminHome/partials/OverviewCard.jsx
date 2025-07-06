import React from "react";

const OverviewCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h4 className="text-sm font-semibold text-gray-500">{title}</h4>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default OverviewCard;
