// src/pages/MyTickets.jsx
import React, { useState, useEffect } from "react";
import TicketCard from "./partials/TicketCard";
import { ticketService } from "../../services";

export default function MyTickets() {
  const [activeFilter, setActiveFilter] = useState("Sắp diễn ra");
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filterTickets, setFilterTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("user_id");
        const tickets = await ticketService.getMyTickets(userId);
        setTickets(tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const now = new Date();
    const filtered = tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.ticket_date);
      const ticketEndDate = new Date(ticket.ticket_date);

      if (activeFilter === "Tất cả") return true;
      if (activeFilter === "Sắp diễn ra") return ticketDate > now;
      if (activeFilter === "Đang diễn ra")
        return ticketDate <= now && ticketEndDate >= now;
      if (activeFilter === "Đã kết thúc") return ticketEndDate < now;

      return false;
    });
    setFilterTickets(filtered);
  }, [activeFilter, tickets]);

  const ticketState = ["Tất cả", "Sắp diễn ra", "Đang diễn ra", "Đã kết thúc"];

  return (
    <div className="flex-1 bg-black">
      <div className="flex items-center justify-center  text-2xl lg:pl-4  h-16 bg-bg-main border-b-2 border-[#A19393] font-semibold text-white mb-4">
        Vé đã mua
      </div>

      <div className="px-4 mb-6">
        <div className="flex gap-x-2 w-full overflow-x-auto pb-2 -mb-2">
          {ticketState.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 cursor-pointer py-1 rounded-3xl flex-shrink-0 text-sm md:text-base ${
                activeFilter === filter
                  ? "bg-primary text-black"
                  : "bg-white text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 px-4">
        {loading ? (
          <p className="text-gray-400 col-span-full text-center py-10">
            Đang tải dữ liệu...
          </p>
        ) : filterTickets.length > 0 ? (
          filterTickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center py-10">
            Không có vé phù hợp.
          </p>
        )}
      </div>
    </div>
  );
}
