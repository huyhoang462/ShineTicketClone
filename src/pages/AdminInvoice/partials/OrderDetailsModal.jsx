/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo } from "react";
import {
  XMarkIcon,
  CalendarDaysIcon,
  UserIcon,
  TicketIcon,
  BanknotesIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const OrderDetailsModal = ({ invoice, closeModal, onConfirm }) => {
  if (!invoice) return null;

  const calculatedTicketDetails = useMemo(() => {
    if (!invoice.order_details || !invoice.total_amount) {
      return [];
    }

    const sortedTickets = [...invoice.order_details].sort(
      (a, b) => parseFloat(b.price) - parseFloat(a.price)
    );

    let remainingAmount = parseFloat(invoice.total_amount);

    const results = sortedTickets.map((ticket) => {
      const price = parseFloat(ticket.price);
      let quantity = 0;

      if (price > 0) {
        quantity = Math.floor(remainingAmount / price);
        remainingAmount -= quantity * price;
      }

      return {
        ...ticket,
        calculated_quantity: quantity,
      };
    });

    return results.filter((ticket) => ticket.calculated_quantity > 0);
  }, [invoice.order_details, invoice.total_amount]);

  const isPending = invoice.order_status_id === "675ea35c101067cb13679b52";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="bg-gray-800 text-gray-200 rounded-xl shadow-lg p-6 md:p-8 w-full max-w-2xl max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-3">
            <CalendarDaysIcon className="h-6 w-6 text-primary" />
            <span>Chi tiết đơn hàng</span>
          </h2>
          <button
            className="text-gray-500 hover:text-white cursor-pointer transition-colors"
            onClick={closeModal}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* ... (Các phần thông tin chung và người mua không đổi) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 mb-8">
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Sự kiện</p>
            <p className="text-lg font-semibold text-white">
              {invoice.event_name}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Ngày đặt hàng</p>
            <p className="text-lg font-semibold text-white">
              {new Date(invoice.order_date).toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white flex items-center space-x-3 mb-4">
            <UserIcon className="h-6 w-6 text-primary" />
            <span>Thông tin người mua</span>
          </h3>
          <div className="bg-gray-700/50 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Tên người mua</p>
              <p className="font-medium text-white">
                {invoice.user_id?.username}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-medium text-white">{invoice.user_id?.email}</p>
            </div>
          </div>
        </div>

        {/* --- PHẦN HIỂN THỊ CHI TIẾT VÉ ĐÃ ĐƯỢC SỬA --- */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white flex items-center space-x-3 mb-4">
            <TicketIcon className="h-6 w-6 text-primary" />
            <span>Các vé đã mua</span>
          </h3>
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
            {calculatedTicketDetails.length > 0 ? (
              calculatedTicketDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-600 pb-2 last:border-b-0"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {/* Hiển thị số lượng đã được tính toán */}
                      {detail.ticket_type} (x{detail.calculated_quantity})
                    </p>
                  </div>
                  <p className="font-medium text-gray-300">
                    {/* Hiển thị tổng tiền cho nhóm vé này */}
                    {(
                      parseFloat(detail.price) * detail.calculated_quantity
                    ).toLocaleString()}{" "}
                    VNĐ
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center text-sm">
                Không thể xác định chi tiết vé.
              </p>
            )}
          </div>
        </div>

        {/* Tổng tiền và Nút hành động (không đổi) */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex justify-between items-center text-xl mb-6">
            <span className="font-semibold text-gray-300 flex items-center gap-2">
              <BanknotesIcon className="h-6 w-6 text-primary" />
              Tổng thanh toán
            </span>
            <span className="font-extrabold text-primary">
              {parseFloat(invoice.total_amount).toLocaleString()} VNĐ
            </span>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-lg cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-semibold"
            >
              Đóng
            </button>
            {isPending && (
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center gap-2"
              >
                <CheckCircleIcon className="h-5 w-5" />
                Xác nhận thanh toán
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
