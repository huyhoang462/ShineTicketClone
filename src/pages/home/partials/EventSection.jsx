import React from "react";

import { API_IMAGE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const EventSection = ({ title, events }) => {
  const navigate = useNavigate();

  const handleCardClick = (eventId) => {
    navigate(`/ticket-details/${eventId}`);
  };

  if (!events || events?.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-white text-xl md:text-2xl font-bold">{title}</h2>
        <div className="flex items-center space-x-2 text-gray-400 hover:text-primary cursor-pointer transition-colors">
          <span className="hidden sm:inline">Xem thêm</span>
          <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {events?.map((event) => (
          <div
            className="group bg-bg-primary rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            key={event?._id}
            onClick={() => handleCardClick(event?._id)}
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                src={`${API_IMAGE}/${event?.cover_image_url}`}
                alt={event?.event_name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="p-4 flex flex-col gap-3 text-white">
              <h3
                className="font-bold text-base leading-snug uppercase truncate"
                title={event?.event_name}
              >
                {event?.event_name}
              </h3>
              <p className="text-primary font-semibold text-lg">
                Từ {event?.lowest_price?.toLocaleString()} đ
              </p>
              <div className="flex items-center text-gray-300 text-sm">
                <CalendarDaysIcon className="w-5 h-5 mr-2 text-gray-400" />
                <span>
                  {new Date(event?.start_date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSection;
