import React from "react";
import {
  XMarkIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { orderService, eventService } from "../../../services";
import { toast } from "react-toastify"; // Import Toastify

const EventDetailsModal = ({ event, onClose, refresh }) => {
  if (!event) return null;

  // Xử lý thanh toán hoàn tiền
  const handelPostRefund = async () => {
    try {
      const now = new Date(); // Khai báo thời gian hiện tại
      const formData = {
        event_id: event?._id,
        organizer_id: event?.organizer_id._id,
        total_amount: event?.event_total_amount,
        refund_amount: (event?.event_total_amount * 10) / 100,
        commission: (event?.event_total_amount * 90) / 100,
        refund_date: now,
      };

      const resRefund = await orderService.createRefund(formData);
      console.log(("tạo refund: ", resRefund));
      const resPaid = await eventService.updatePaidEvent(event?._id);
      console.log(("tạo paid: ", resPaid));
      refresh();
      onClose();
    } catch (error) {
      console.error("Error processing refund:", error);
      toast.error("Đã xảy ra lỗi trong quá trình hoàn tiền.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 ">
      <div className="bg-gray-800 text-gray-200  rounded-xl shadow-lg p-8 w-11/12 max-w-4xl overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-200 flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-indigo-600" />
            <span>{event?.event_name}</span>
          </h2>
          <button
            className=" text-gray-300 cursor-pointer hover:text-red-500 text-xl"
            onClick={onClose}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm  text-gray-300">Bắt đầu</p>
            <p className="text-lg font-semibold">
              {new Date(event?.start_date).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm  text-gray-300">Kết thúc</p>
            <p className="text-lg font-semibold">
              {new Date(event?.end_date).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-200 flex items-center space-x-2">
            <UserIcon className="h-6 w-6 text-green-600" />
            <span>Thông tin ban tổ chức</span>
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            <div>
              <p className="text-sm  text-gray-300">Tên</p>
              <p className="font-medium">
                {event?.organizer_id?.organizer_name}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Số điện thoại</p>
              <p className="font-medium">
                {event?.organizer_id?.organizer_phone_number}
              </p>
            </div>
            <div>
              <p className="text-sm  text-gray-300">Email</p>
              <p className="font-medium">
                {event?.organizer_id?.organizer_email}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm  text-gray-300">Tài khoản ngân hàng</p>
              <p className="font-medium">
                {event?.organizer_id?.account_number} -{" "}
                {event?.organizer_id?.bank_name}. Chủ tài khoản:{" "}
                {event?.organizer_id?.owner_name}
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
              <span className=" text-gray-300">Doanh thu:</span>
              <span className="font-medium text-xl text-green-500">
                {event?.event_total_amount?.toLocaleString()} VNĐ
              </span>
            </p>
            <p className="flex justify-between">
              <span className=" text-gray-300">Tiền cần thanh toán:</span>
              <span className="font-medium text-xl text-red-500">
                {((event?.event_total_amount * 90) / 100)?.toLocaleString()} VNĐ
              </span>
            </p>
          </div>
        </div>

        {/* Refund Action */}
        <div className="flex justify-end mt-2 mb-[-8px]">
          <button
            className="bg-gray-900 px-4 py-2 cursor-pointer hover:text-primary  rounded-lg text-gray-300"
            onClick={handelPostRefund}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
