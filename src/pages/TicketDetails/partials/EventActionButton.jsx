// src/pages/partials/EventActionButton.jsx
import React from "react";
import { Link } from "react-router-dom";

const EventActionButton = ({ event, className = "" }) => {
  if (!event) return null;

  const buttonBaseClass = ` rounded-lg font-bold text-white transition-all duration-300 ${className}`;

  if (new Date(event.start_date) > new Date()) {
    return event.available_tickets > 0 ? (
      <div
        className={`${buttonBaseClass} bg-primary  hover:bg-white cursor-pointer hover:text-black`}
      >
        <Link
          className="w-full px-4 py-2  h-full flex justify-center items-center"
          to={`/select-ticket?eventId=${event._id}`}
          state={{ event }}
        >
          Mua vé
        </Link>
      </div>
    ) : (
      <div
        className={`${buttonBaseClass} bg-gray-500 cursor-not-allowed`}
        disabled
      >
        Hết vé
      </div>
    );
  } else {
    return (
      <button
        className={`${buttonBaseClass} bg-gray-500 cursor-not-allowed`}
        disabled
      >
        Đã kết thúc
      </button>
    );
  }
};

export default EventActionButton;
