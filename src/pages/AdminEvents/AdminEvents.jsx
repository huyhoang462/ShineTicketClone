/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import EventList from "./partials/EventList";
import EventDetailsModal from "./partials/EventDetailsModal"; // Đảm bảo đường dẫn modal đúng
import { eventService } from "../../services";
import EventSearchBar from "./partials/EventSearchBar";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function AdminEvents() {
  // --- TOÀN BỘ LOGIC HIỆN TẠI CỦA BẠN (KHÔNG THAY ĐỔI) ---
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: events = [],
    isLoading: loading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminAllEvents"],
    queryFn: async () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const eventFromApi = await eventService.getAllEvents();

      const updatePromises = eventFromApi.map((event) => {
        const startDate = new Date(
          new Date(event.start_date).getFullYear(),
          new Date(event.start_date).getMonth(),
          new Date(event.start_date).getDate()
        );
        const endDate = new Date(
          new Date(event.end_date).getFullYear(),
          new Date(event.end_date).getMonth(),
          new Date(event.end_date).getDate()
        );

        if (event.event_status_id?._id === "675ea25872e40e87eb7dbf08") {
          // Sắp diễn ra
          if (endDate < today) {
            return eventService.setOccuredEvent(event._id).then(() => {
              event.event_status_id._id = "675ea26172e40e87eb7dbf0a"; // Đã kết thúc
            });
          } else if (startDate <= today && endDate >= today) {
            return eventService.setOccuringEvent(event._id).then(() => {
              event.event_status_id._id = "675ea24172e40e87eb7dbf06"; // Đang diễn ra
            });
          }
        }
        return Promise.resolve();
      });

      await Promise.all(updatePromises);
      return eventFromApi;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let results = [...events];

    if (searchTerm) {
      results = results.filter((event) =>
        (event.event_name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== "Tất cả") {
      const statusMap = {
        "Chờ duyệt": "676ece5d50c4e95732edbadd",
        "Sắp diễn ra": "675ea25872e40e87eb7dbf08",
        "Đang diễn ra": "675ea24172e40e87eb7dbf06",
        "Đã kết thúc": "675ea26172e40e87eb7dbf0a",
        "Đã hủy": "676ece8250c4e95732edbadf",
      };
      const statusId = statusMap[activeFilter];
      results = results.filter(
        (event) => event.event_status_id?._id === statusId
      );
    }
    setFilteredEvents(results);
  }, [events, activeFilter, searchTerm]);

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["adminAllEvents"] });
  };

  const filterEvents = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = ({ searchTerm: newSearchTerm }) => {
    setSearchTerm(newSearchTerm);
  };
  // --- KẾT THÚC LOGIC ---

  const filterButtons = [
    "Tất cả",
    "Chờ duyệt",
    "Sắp diễn ra",
    "Đang diễn ra",
    "Đã kết thúc",
    "Đã hủy",
  ];

  return (
    // Sử dụng padding responsive
    <div className="p-4 md:p-6 min-h-full">
      {/* --- THANH TÌM KIẾM VÀ FILTER ĐÃ ĐƯỢC LÀM RESPONSIVE --- */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        {/* Ô tìm kiếm */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <EventSearchBar onSearch={handleSearch} />
        </div>
        {/* Các nút filter */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex gap-2 overflow-x-auto pb-2 -mb-2">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => filterEvents(filter)}
              className={`py-2 px-4 cursor-pointer rounded-lg text-xs md:text-sm font-semibold flex-shrink-0 transition-colors ${
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

      {/* --- KHU VỰC HIỂN THỊ KẾT QUẢ --- */}
      <div className="mt-4">
        {loading ? (
          <div className="text-center text-white py-10">
            Đang tải sự kiện...
          </div>
        ) : filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} onViewDetails={setSelectedEvent} />
        ) : (
          <div className="text-center text-gray-400 py-10">
            Không có sự kiện nào.
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {selectedEvent && (
        <EventDetailsModal
          selectedEvent={selectedEvent} // Giả sử modal nhận prop là 'selectedEvent'
          closeModal={() => setSelectedEvent(null)}
          refreshData={refreshData}
        />
      )}
    </div>
  );
}
