// src/pages/admin/partials/CardEvent.jsx
import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

const CardEvent = ({ event, onViewDetails }) => {
  const statusColorMap = {
    "676ece5d50c4e95732edbadd":
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "675ea25872e40e87eb7dbf08":
      "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "675ea24172e40e87eb7dbf06":
      "bg-green-500/20 text-green-400 border-green-500/30",
    "675ea26172e40e87eb7dbf0a": "bg-red-500/20 text-red-400 border-red-500/30",
    "676ece8250c4e95732edbadf":
      "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };
  const statusTextMap = {
    "676ece5d50c4e95732edbadd": "Chờ duyệt",
    "675ea25872e40e87eb7dbf08": "Sắp diễn ra",
    "675ea24172e40e87eb7dbf06": "Đang diễn ra",
    "675ea26172e40e87eb7dbf0a": "Đã kết thúc",
    "676ece8250c4e95732edbadf": "Đã hủy",
  };

  const statusId = event?.event_status_id?._id;

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 shadow-md">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-base text-white pr-4">
          {event?.event_name}
        </h3>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
            statusColorMap[statusId] || "bg-gray-700 text-gray-400"
          }`}
        >
          {statusTextMap[statusId] || "Không xác định"}
        </span>
      </div>

      <div className="text-gray-400 space-y-1 mb-3">
        <p>
          Bắt đầu:{" "}
          <span className="text-gray-300">
            {new Date(event?.start_date).toLocaleDateString("vi-VN")}
          </span>
        </p>
        <p>
          Kết thúc:{" "}
          <span className="text-gray-300">
            {new Date(event?.end_date).toLocaleDateString("vi-VN")}
          </span>
        </p>
      </div>

      <div className="border-t border-gray-700 mt-3 pt-3 flex justify-end">
        <button
          onClick={() => onViewDetails(event)}
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <EyeIcon className="w-5 h-5" />
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default CardEvent;
