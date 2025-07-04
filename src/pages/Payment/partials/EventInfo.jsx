import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React from "react";

const EventInfo = ({ event }) => {
  return (
    <div className=" text-white  rounded-lg w-full space-y-3">
      <p className="text-2xl font-bold font-inter leading-[150%] overflow-hidden break-words pb-4 mr-6 mb-4 border-b-2 border-white">
        {event?.event_name}
      </p>

      <h2 className="font-bold mt-4 text-primary flex items-center">
        <CalendarDaysIcon className="inline h-6 text-white mr-2" />{" "}
        {new Date(event?.start_date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </h2>
      <h2 className="font-bold mt-4 text-primary flex items-center">
        <MapPinIcon className="inline h-6 text-white mr-2" />{" "}
        {event?.venue_id?.venue_name}
      </h2>
      <h2 className="font-bold mt-2 text-white flex items-center">
        {event?.venue_id?.street_name.charAt(0).toUpperCase() +
          event?.venue_id?.street_name.slice(1)}
        , {event?.venue_id?.ward}, {event?.venue_id?.district},{" "}
        {event?.venue_id?.city}
      </h2>
    </div>
  );
};
export default EventInfo;
