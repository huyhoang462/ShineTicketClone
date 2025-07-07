// src/pages/admin/partials/EventSearchBar.jsx
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const EventSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    // Cho phép tìm kiếm bằng cách nhấn Enter
    if (e.key === "Enter" || e.type === "click") {
      onSearch({ searchTerm });
    }
  };

  return (
    // Sửa: Thêm relative để đặt icon
    <div className="flex items-center relative">
      <input
        type="text"
        placeholder="Tìm kiếm sự kiện..."
        className="border border-gray-300 rounded-lg pl-4 pr-10 py-2 w-full text-black text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch} // Thêm tìm kiếm bằng Enter
      />
      <button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default EventSearchBar;
