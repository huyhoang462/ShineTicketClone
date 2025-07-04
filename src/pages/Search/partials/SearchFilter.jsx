/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const defaultFilters = {
  dateFrom: "",
  dateTo: "",
  location: "Toàn quốc",
  category: "Tất cả",
  priceRange: [0, 10000000],
};

export default function SearchFilter({
  initialFilters,
  onApply,
  onReset,
  onClose,
}) {
  const [localFilters, setLocalFilters] = useState(initialFilters);

  const locations = [
    "Toàn quốc",
    "Hồ Chí Minh",
    "Hà Nội",
    "Đà Lạt",
    "Vị trí khác",
  ];
  const categories = [
    "Tất cả",
    "Nhạc sống",
    "Sân khấu & Nghệ thuật",
    "Thể thao",
    "Khác",
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyClick = () => {
    onApply(localFilters);
  };

  const handleResetClick = () => {
    setLocalFilters(defaultFilters);
    onReset();
  };

  return (
    <div className="absolute top-full mt-2 right-0 bg-white text-black p-4 rounded-md shadow-lg w-80 md:w-96 z-50">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ngày
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={localFilters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            className="border border-gray-300 px-2 py-1.5 rounded-md w-full text-sm"
          />
          <input
            type="date"
            value={localFilters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            className="border border-gray-300 px-2 py-1.5 rounded-md w-full text-sm"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vị trí
        </label>
        <select
          value={localFilters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="border border-gray-300 px-2 py-1.5 rounded-md w-full text-sm"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thể loại
        </label>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange("category", cat)}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                localFilters.category === cat
                  ? "bg-primary border-primary text-white font-semibold"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Khoảng giá
        </label>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={5000000}
            step={100000}
            value={localFilters.priceRange}
            onChange={(value) => handleFilterChange("priceRange", value)}
            trackStyle={[{ backgroundColor: "#ffc107" }]}
            handleStyle={[
              { borderColor: "#ffc107" },
              { borderColor: "#ffc107" },
            ]}
            railStyle={{ backgroundColor: "#e5e7eb" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{localFilters.priceRange[0].toLocaleString()}đ</span>
          <span>{localFilters.priceRange[1].toLocaleString()}đ</span>
        </div>
      </div>
      <div className="flex gap-2 mt-4 border-t border-gray-200 pt-4">
        <button
          onClick={handleResetClick}
          className="bg-gray-200 px-4 py-2 rounded-md w-1/2 text-sm hover:bg-gray-300 transition-colors"
        >
          Thiết lập lại
        </button>
        <button
          onClick={handleApplyClick}
          className="bg-primary text-black px-4 py-2 rounded-md w-1/2 text-sm font-semibold hover:bg-yellow-400 transition-colors"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
