import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import EventActionButton from "./EventActionButton";

const TicketInfo = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!event?.tickets || event.tickets.length === 0) {
    return (
      <div className="bg-[#38383D] text-gray-400 text-center p-6 rounded-xl mb-10">
        Hiện chưa có thông tin về các loại vé cho sự kiện này.
      </div>
    );
  }

  return (
    <div className="bg-[#38383D] mx-4  rounded-xl overflow-hidden shadow-lg mb-10">
      <button
        className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-left px-6 py-4 gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center text-white">
          <ChevronDownIcon
            className={`h-6 w-6 text-primary mr-4 transition-transform cursor-pointer duration-300 ${
              isOpen ? "rotate-0" : "-rotate-90"
            }`}
          />
          <div className="font-semibold text-lg">
            {new Date(event?.start_date).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
            <span className="text-gray-400 font-normal ml-2">
              ({event.tickets.length} loại vé)
            </span>
          </div>
        </div>
        <div className="w-full sm:w-auto pl-10 sm:pl-0">
          <EventActionButton event={event} className="w-full" />
        </div>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="bg-gray-800 border-t border-gray-700">
          {event?.tickets.map((ticket, index) => (
            <div
              key={index}
              className="px-6 py-5 border-b border-gray-700 last:border-b-0"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="text-base font-semibold text-white">
                  {ticket.ticketType}
                </div>
                <div className="text-lg font-bold text-primary">
                  {ticket.price.toLocaleString()} VNĐ
                </div>
              </div>
              <p className="text-gray-400 mt-2 text-sm">{ticket.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
