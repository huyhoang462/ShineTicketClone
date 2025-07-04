import React, { useEffect, useState } from "react";
import EventCard from "./partials/EventCard";
import { eventService } from "../../services";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("user_id");
        const eventFromApi = await eventService.getEventsByUser(userId);
        setEvents(eventFromApi);
        setFilteredEvents(eventFromApi);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filterEvents = (filter) => {
    setActiveFilter(filter);
    if (filter === "Tất cả") {
      setFilteredEvents(events);
    } else {
      const statusMap = {
        "Chờ duyệt": "676ece5d50c4e95732edbadd",
        "Sắp diễn ra": "675ea25872e40e87eb7dbf08",
        "Đang diễn ra": "675ea24172e40e87eb7dbf06",
        "Đã kết thúc": "675ea26172e40e87eb7dbf0a",
        "Đã hủy": "676ece8250c4e95732edbadf",
      };
      const statusId = statusMap[filter];
      const filtered = events.filter(
        (event) => event.event_status_id === statusId
      );
      setFilteredEvents(filtered);
    }
  };

  const filterButtons = [
    "Tất cả",
    "Chờ duyệt",
    "Sắp diễn ra",
    "Đang diễn ra",
    "Đã kết thúc",
    "Đã hủy",
  ];

  return (
    <div className="flex-1 bg-black">
      {" "}
      <div className="flex items-center justify-center  text-2xl lg:pl-4  h-16 bg-bg-main border-b-2 border-[#A19393] font-semibold text-white mb-4">
        Sự kiện đã tạo
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 px-4 md:px-6 mb-6">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            className="p-2 bg-white text-black rounded-lg w-full text-sm"
          />
        </div>

        <div className="w-full md:w-2/3 flex gap-2 overflow-x-auto pb-2 -mb-2">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => filterEvents(filter)}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold flex-shrink-0 transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-black"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 md:px-6 space-y-6">
        {loading ? (
          <div className="text-white text-center py-10">
            Đang tải sự kiện...
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <div className="text-white text-center py-10">
            Không có sự kiện nào.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;
