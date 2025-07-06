import React from "react";
import {
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const EventDetailsModal = ({ selectedEvent, closeModal }) => {
  if (!selectedEvent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 text-gray-200 rounded-xl shadow-lg p-8 w-11/12 max-w-4xl overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-200 flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-indigo-600" />
            <span>{selectedEvent?.event_id?.event_name}</span>
          </h2>
          <button
            className="text-gray-500 hover:text-red-500 text-xl"
            onClick={closeModal}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm  text-gray-300">Bắt đầu</p>
            <p className="text-lg font-semibold">
              {new Date(selectedEvent?.event_id?.start_date).toLocaleDateString(
                "vi-VN"
              )}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm  text-gray-300">Kết thúc</p>
            <p className="text-lg font-semibold">
              {new Date(selectedEvent?.event_id?.end_date).toLocaleDateString(
                "vi-VN"
              )}
            </p>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
            <UserIcon className="h-6 w-6 text-green-600" />
            <span>Thông tin ban tổ chức</span>
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm  text-gray-300">Tên</p>
              <p className="font-medium">
                {selectedEvent?.organizer_id?.organizer_name}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Email</p>
              <p className="font-medium">
                {selectedEvent?.organizer_id?.organizer_email}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Số điện thoại</p>
              <p className="font-medium">
                {selectedEvent?.organizer_id?.organizer_phone_number}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm  text-gray-300">Tài khoản ngân hàng</p>
              <p className="font-medium">
                {selectedEvent?.organizer_id?.account_number} -{" "}
                {selectedEvent?.organizer_id?.bank_name}. Chủ tài khoản:{" "}
                {selectedEvent?.organizer_id?.owner_name}
              </p>
            </div>
          </div>
        </div>

        {/* Revenue Info */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
            <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
            <span>Doanh thu</span>
          </h3>
          <div className="mt-4 space-y-3">
            <p className="flex justify-between">
              <span className=" text-gray-300">Tổng doanh thu:</span>
              <span className="font-medium text-yellow-600">
                {selectedEvent?.total_amount?.$numberDecimal} VNĐ
              </span>
            </p>
            <p className="flex justify-between">
              <span className=" text-gray-300">Tiền hoàn lại:</span>
              <span className="font-medium text-red-600">
                {selectedEvent?.refund_amount?.$numberDecimal} VNĐ
              </span>
            </p>
            <p className="flex justify-between">
              <span className=" text-gray-300">Tiền giữ lại:</span>
              <span className="font-medium text-green-600">
                {selectedEvent?.commission?.$numberDecimal} VNĐ
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
