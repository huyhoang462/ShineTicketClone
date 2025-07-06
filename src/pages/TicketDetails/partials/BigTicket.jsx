import React from "react";
import { Link } from "react-router-dom";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { API_IMAGE } from "../../../constants";
import EventActionButton from "./EventActionButton";

const BigTicket = ({ event }) => {
  const getMinPrice = (tickets) => {
    if (!tickets || tickets.length === 0) return 0;
    return Math.min(...tickets.map((ticket) => ticket.price));
  };

  const fullAddress = [
    event?.venue_id?.street_name,
    event?.venue_id?.ward,
    event?.venue_id?.district,
    event?.venue_id?.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-full h-max pb-8 mt-4 px-4">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 text-white rounded-2xl bg-bg-primary overflow-hidden shadow-2xl">
        <div className="flex col-span-1 md:col-span-1 bg-[#38383D] relative p-8">
          <div className="absolute w-16 h-16 rounded-full bottom-0 left-0  md:top-0 md:right-0 md:left-auto md:bottom-auto  transform -translate-x-8 translate-y-8 md:translate-x-8 md:-translate-y-8 bg-bg-main"></div>
          <div className="absolute w-16 h-16 rounded-full bottom-0 right-0 transform translate-x-8 translate-y-8 bg-bg-main"></div>

          <div className="w-full h-full flex flex-col justify-between">
            <div>
              <h1 className=" text-xl sm:text-2xl lg:text-3xl font-bold font-inter break-words">
                {event?.event_name}
              </h1>
              <div className="mt-4 space-y-3 text-gray-300">
                <div className="flex items-start">
                  <CalendarDaysIcon className="inline h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-md md:text-lg">
                    {event?.start_date
                      ? new Date(event.start_date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "01/07/2025"}
                  </span>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="inline  h-5 w-5 sm:h-6 sm:w-6 text-primary mr-3 flex-shrink-0" />
                  <div className="text-sm sm:text-md md:text-lg">
                    <span className="font-semibold text-white">
                      {event?.venue_id?.venue_name}
                    </span>
                    <span className="block text-sm text-gray-400">
                      {fullAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-600">
              <div className="mb-4">
                <div className="text-md sm:text-lg font-semibold text-gray-300">
                  Giá từ:{" "}
                  <span className="text-lg sm:text-2xl font-bold text-primary">
                    {getMinPrice(event?.tickets).toLocaleString()} VNĐ
                  </span>
                </div>
              </div>
              <EventActionButton
                event={event}
                className="w-full  text-sm sm:text-md md:text-lg   "
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex items-center justify-center overflow-hidden min-h-[300px]">
          {/* SỬA LỖI: Thêm optional chaining và có thể bạn muốn dùng cover_image_url? */}
          <img
            className="w-full h-full object-cover object-center"
            src={`${API_IMAGE}/${event?.cover_image_url || event?.logo_url}`}
            alt={event?.event_name || "Event Image"}
          />
        </div>
      </div>
    </div>
  );
};

export default BigTicket;
