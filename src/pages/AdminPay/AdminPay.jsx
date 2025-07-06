import React, { useEffect, useState } from "react";
import PaymentEventList from "./partials/PaymentEventList";
import EventDetailsModal from "./partials/EventDetailsModal";
import { orderService } from "../../services";
import { ToastContainer } from "react-toastify";

export default function AdminPay() {
  const [payEvents, setPayEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // Danh sách hiển thị
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const events = await orderService.getEventPay();
        const filtered = events.filter(
          (event) =>
            event.event_status_id._id === "675ea26172e40e87eb7dbf0a" &&
            !event.paid
        );
        setPayEvents(filtered);
        setFilteredEvents(filtered);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handlePay = async (event) => {
    console.log(`Thanh toán cho sự kiện: ${event.name}`);
    const updatedEvents = filteredEvents.filter((e) => e._id !== event._id);
    setPayEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleSearch = (searchTerm) => {
    const filtered = payEvents.filter((event) =>
      event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <div className="p-6 min-h-[calc(100vh-64px)] ">
      <h1 className="text-2xl text-gray-300 font-bold mb-4">
        Các sự kiện chờ thanh toán
      </h1>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <PaymentEventList
            events={filteredEvents}
            onPay={handlePay}
            onViewDetails={handleViewDetails}
            onSearch={handleSearch}
          />
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
}
