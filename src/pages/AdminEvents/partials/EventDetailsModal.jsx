import React from "react";
import { eventService } from "../../../services";
import { XMarkIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
const EventDetailsModal = ({ event, onClose, refreshData }) => {
  if (!event) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const onApprove = async (id) => {
    try {
      await eventService.setWillOccureEvent(id);
      refreshData();
      onClose();
    } catch (error) {
      console.error("Lỗi khi duyệt sự kiện:", error);
      alert("Không thể duyệt sự kiện. Vui lòng thử lại!");
    }
  };

  const onReject = async (id) => {
    try {
      await eventService.setRejectEvent(id);
      refreshData();
      onClose();
    } catch (error) {
      console.error("Lỗi khi từ chối sự kiện:", error);
      alert("Không thể từ chối sự kiện. Vui lòng thử lại!");
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg w-full p-2 max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          {event?.cover_image_url && (
            <div className="relative w-full h-56 bg-gray-100">
              <img
                src={`http://localhost:8080/images/${event?.cover_image_url}`}
                alt={event?.event_name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Event Name */}
          <h2 className="text-2xl font-bold text-gray-200 mb-4 flex items-center">
            <CalendarIcon className="w-6 h-6 text-indigo-600 mr-2" />
            {event?.event_name}
          </h2>

          {/* Event Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm  text-gray-300">Thể loại</p>
              <p className="text-lg font-medium text-gray-200">
                {event?.event_type_id?.type_name || "Khác"}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Hình thức</p>
              <p className="text-lg font-medium text-gray-200">
                {event?.event_format === "offline" ? "Trực tiếp" : "Trực tuyến"}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Ngày bắt đầu</p>
              <p className="text-lg font-medium text-gray-200">
                {formatDate(event?.start_date)}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Ngày kết thúc</p>
              <p className="text-lg font-medium text-gray-200">
                {formatDate(event?.end_date)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm  text-gray-300">Địa điểm</p>
              <p className="text-lg font-medium text-gray-200">
                {`${event?.venue_id?.venue_name || "Không rõ"}, ${
                  event?.venue_id?.city || "Không rõ"
                }`}
              </p>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center">
              <UserIcon className="w-6 h-6 text-green-600 mr-2" />
              Thông tin ban tổ chức
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm  text-gray-300">Tên</p>
                <p className="text-lg font-medium text-gray-200">
                  {event?.organizer_id?.organizer_name || "Không rõ"}
                </p>
              </div>
              <div>
                <p className="text-sm  text-gray-300">Email</p>
                <p className="text-lg font-medium text-gray-200">
                  {event?.organizer_id?.organizer_email || "Không rõ"}
                </p>
              </div>
              <div>
                <p className="text-sm  text-gray-300">Số điện thoại</p>
                <p className="text-lg font-medium text-gray-200">
                  {event?.organizer_id?.organizer_phone_number || "Không rõ"}
                </p>
              </div>
              <div>
                <p className="text-sm  text-gray-300">Tài khoản ngân hàng</p>
                <p className="text-lg font-medium text-gray-200">
                  {`${event?.organizer_id?.bank_name || "Không rõ"} - ${
                    event?.organizer_id?.account_number || "Không rõ"
                  }`}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-200 mb-4">
              Thông tin vé
            </h3>
            <div className="space-y-4">
              {event?.ticket_details?.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-4 bg-gray-700 rounded-lg grid grid-cols-3 gap-4"
                >
                  <div>
                    <p className="text-sm  text-gray-300">Loại vé</p>
                    <p className="text-lg font-medium text-gray-200">
                      {ticket.ticket_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm  text-gray-300">Giá</p>
                    <p className="text-lg font-medium text-gray-200">
                      {ticket.price.toLocaleString()} VND
                    </p>
                  </div>
                  <div>
                    <p className="text-sm  text-gray-300">Số lượng</p>
                    <p className="text-lg font-medium text-gray-200">
                      {ticket.ticket_quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
            >
              Đóng
            </button>
            {event?.event_status_id?._id === "676ece5d50c4e95732edbadd" && (
              <>
                <button
                  onClick={() => onApprove(event._id)}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                >
                  Duyệt
                </button>
                <button
                  onClick={() => onReject(event._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Từ chối
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
