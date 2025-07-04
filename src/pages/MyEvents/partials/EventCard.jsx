import React from "react";
import { Link } from "react-router-dom";
import { API_IMAGE } from "../../../constants";
const EventCard = ({ event }) => {
  const getStatusDetails = (statusId) => {
    const statusMap = {
      "676ece5d50c4e95732edbadd": {
        label: "Chờ duyệt",
        bgColor: "bg-yellow-400",
      },
      "675ea25872e40e87eb7dbf08": {
        label: "Sắp diễn ra",
        bgColor: "bg-green-400",
      },
      "675ea24172e40e87eb7dbf06": {
        label: "Đang diễn ra",
        bgColor: "bg-blue-400",
      },
      "675ea26172e40e87eb7dbf0a": {
        label: "Đã kết thúc",
        bgColor: "bg-gray-400",
      },
      "676ece8250c4e95732edbadf": { label: "Đã hủy", bgColor: "bg-red-400" },
    };
    return (
      statusMap[statusId] || { label: "Không xác định", bgColor: "bg-gray-200" }
    );
  };
  const { label, bgColor } = getStatusDetails(event?.event_status_id);

  return (
    <div className="bg-bg-main p-4 rounded-lg text-white shadow-lg">
      <div className="flex flex-col md:flex-row justify-between border-b-2 border-gray-700 pb-4">
        <div className="flex flex-col sm:flex-row flex-1">
          <div className="w-full sm:w-48 md:w-56 h-40 flex-shrink-0 bg-gray-500 rounded-lg overflow-hidden">
            <img
              src={`${API_IMAGE}/${event?.cover_image_url}`}
              className="w-full h-full object-cover"
              alt={event?.event_name}
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{event?.event_name}</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-primary">
                  📅{" "}
                  {new Date(event.start_date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p className="text-primary">
                  📍{" "}
                  {event?.event_format === "offline"
                    ? event?.venue_id?.venue_name
                    : "Sự kiện online"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <div
            className={`${bgColor} h-8 px-3 flex justify-center items-center rounded-md text-black font-semibold text-sm`}
          >
            {label}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-around items-center text-sm text-center text-white">
          <Link
            to={`/summary/${event._id}`}
            className="cursor-pointer font-semibold hover:text-primary transition-colors"
          >
            Tổng kết
          </Link>
          <Link
            to={`/orders/${event._id}`}
            className="cursor-pointer font-semibold hover:text-primary transition-colors"
          >
            Đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
