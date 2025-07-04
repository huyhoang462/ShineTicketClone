import React from "react";

export default function FormField({
  label,
  type = "text",
  required = false,
  ...rest
}) {
  return (
    <div>
      <label className="text-white">
        {required && (
          <span className="text-[#C83030] font-bold text-lg">* </span>
        )}
        {label}
        <input
          type={type}
          className="w-full p-2 mt-2 bg-white text-black outline-none border border-gray-600 rounded mb-4"
          {...rest}
        />
      </label>
    </div>
  );
}
