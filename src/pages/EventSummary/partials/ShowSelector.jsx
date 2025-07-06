import React from "react";

const ShowSelector = ({ shows, selectedDate, onChange }) => {
  return (
    <div className="my-4">
      <select
        className="p-2 rounded-md bg-[#393F4E] text-white"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Chọn ngày --</option>
        {shows.map((show, index) => (
          <option key={index} value={show.date}>
            {show.date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShowSelector;
