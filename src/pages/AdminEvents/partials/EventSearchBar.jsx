/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const EventSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({ searchTerm, category });
  };

  return (
    <div className="flex items-center  col-span-2 ">
      <input
        type="text"
        placeholder="Tìm kiếm sự kiện..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default EventSearchBar;
