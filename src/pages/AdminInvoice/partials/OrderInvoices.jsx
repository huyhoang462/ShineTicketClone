/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { orderService } from "../../../services";
import { toast } from "react-toastify";
import OrderDetailsModal from "./OrderDetailsModal";
import { EyeIcon } from "@heroicons/react/24/outline";

const OrderInvoices = ({ invoices, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const statusTextMap = {
    "675ea35c101067cb13679b52": "Chờ xử lý",
    "675ea365101067cb13679b55": "Đã xác nhận",
    "675ea36b101067cb13679b57": "Đã hủy",
  };

  const statusColorMap = {
    "675ea35c101067cb13679b52": "text-yellow-500",
    "675ea365101067cb13679b55": "text-green-500",
    "675ea36b101067cb13679b57": "text-red-500",
  };

  // Hàm để mở modal
  const handleViewDetails = (invoice) => {
    console.log("mở: ", invoice);

    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  // Hàm để đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  // Hàm được gọi khi người dùng xác nhận trong modal
  const handleConfirmCompletion = async () => {
    if (selectedInvoice?._id) {
      try {
        await orderService.editOrder(
          selectedInvoice._id,
          "675ea365101067cb13679b55"
        );
        toast.success("Xác nhận thanh toán thành công!");
        refresh(); // Gọi lại hàm refresh để cập nhật danh sách
      } catch (error) {
        toast.error("Không thể hoàn tất thanh toán!");
      } finally {
        // Luôn đóng modal sau khi hành động hoàn tất
        handleCloseModal();
      }
    }
  };

  return (
    <>
      {/* 1. Giao diện dạng Card cho Mobile (< 768px) */}
      <div className="md:hidden space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-white">
                {invoice?.event_name}
              </span>
              <span
                className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                  statusColorMap[invoice?.order_status_id] || "text-gray-500"
                }`}
              >
                {statusTextMap[invoice?.order_status_id] || "Không xác định"}
              </span>
            </div>
            <p className="text-gray-400">
              Người mua:{" "}
              <span className="text-white">{invoice?.user_id?.username}</span>
            </p>
            <p className="text-gray-400">
              Ngày:{" "}
              <span className="text-white">
                {new Date(invoice?.order_date).toLocaleDateString("vi-VN")}
              </span>
            </p>
            <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between items-center">
              <p className="text-lg font-bold text-primary">
                {parseFloat(invoice?.total_amount).toLocaleString()} VND
              </p>
              <button
                className="h-8 text-black px-3 rounded-md text-xs font-semibold bg-gray-300 hover:bg-white transition-colors"
                onClick={() => handleViewDetails(invoice)}
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Giao diện dạng Bảng cho Desktop (>= 768px) */}
      <div className="bg-gray-900 shadow-md rounded-lg mt-4 hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-gray-300 text-left text-xs font-semibold uppercase">
                STT
              </th>
              <th className="px-4 py-3 text-gray-300 text-left text-xs font-semibold uppercase">
                Tên sự kiện
              </th>
              <th className="px-4 py-3 text-gray-300 text-left text-xs font-semibold uppercase">
                Người mua
              </th>
              <th className="px-4 py-3 text-gray-300 text-left text-xs font-semibold uppercase">
                Số tiền
              </th>
              <th className="px-4 py-3 text-gray-300 text-left text-xs font-semibold uppercase">
                Ngày đặt hàng
              </th>
              <th className="px-4 py-3 text-gray-300 text-left text-xs font-semibold uppercase">
                Trạng thái
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr
                key={invoice._id}
                className="hover:bg-gray-800 text-gray-200 text-sm"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{invoice?.event_name}</td>
                <td className="px-4 py-2">{invoice?.user_id?.username}</td>
                <td className="px-4 py-2">
                  {parseFloat(invoice?.total_amount).toLocaleString()} VND
                </td>
                <td className="px-4 py-2">
                  {new Date(invoice?.order_date).toLocaleString("vi-VN")}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    statusColorMap[invoice?.order_status_id] || "text-gray-500"
                  }`}
                >
                  {statusTextMap[invoice?.order_status_id] || "Không xác định"}
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="flex items-center justify-center"
                    onClick={() => handleViewDetails(invoice)}
                  >
                    <EyeIcon className="h-6 text-gray-300 cursor-pointer hover:text-primary transition-colors duration-200" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL CHI TIẾT ĐƠN HÀNG --- */}
      <OrderDetailsModal
        invoice={selectedInvoice}
        closeModal={handleCloseModal}
        onConfirm={handleConfirmCompletion} // Truyền hàm xác nhận vào modal
      />
    </>
  );
};

export default OrderInvoices;
