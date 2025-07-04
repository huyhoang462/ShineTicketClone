import React from "react";

export default function FormSection({ title, children }) {
  return (
    <div className="bg-bg-main px-6 py-4 mx-6 rounded-xl space-y-4">
      {title && <span className="text-[#C83030] font-bold text-lg">* </span>}
      <label className="text-white font-semibold">{title}</label>
      {children}
    </div>
  );
}
