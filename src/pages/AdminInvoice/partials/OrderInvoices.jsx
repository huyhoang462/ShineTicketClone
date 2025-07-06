/* eslint-disable no-unused-vars */
import React from "react";
import { orderService } from "../../../services";
import { toast } from "react-toastify";

const OrderInvoices = ({ invoices, refresh }) => {
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
  const handleOrderCompletion = async (orderId) => {
    if (orderId) {
      try {
        await orderService.editOrder(orderId, "675ea365101067cb13679b55");
        toast.success("Thanh toán thành công!");
        refresh();
      } catch (error) {
        toast.error("Không thể hoàn tất thanh toán!");
      }
    }
  };

  return (
    <div className="bg-gray-900 shadow-md rounded-lg mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2 text-gray-300 text-left">STT</th>
            <th className="px-4 py-2 text-gray-300 text-left">Tên sự kiện</th>
            <th className="px-4 py-2 text-gray-300 text-left">Người mua</th>
            <th className="px-4 py-2 text-gray-300 text-left">Số tiền</th>
            <th className="px-4 py-2 text-gray-300 text-left">
              Ngày thanh toán
            </th>
            <th className="px-4 py-2 text-gray-300 text-left">Trạng thái</th>
            <th className="px-4 py-2 text-gray-300 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={invoice._id} className="hover:bg-gray-800 text-gray-200">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{invoice?.event_name}</td>
              <td className="px-4 py-2">{invoice?.user_id?.username}</td>
              <td className="px-4 py-2">
                {parseFloat(invoice?.total_amount).toLocaleString()} VND
              </td>
              <td className="px-4 py-2">
                {new Date(invoice?.order_date).toLocaleDateString("vi-VN", {
                  timeZone: "UTC",
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td
                className={`px-4 py-2 font-semibold ${
                  statusColorMap[invoice?.order_status_id] || "text-gray-500"
                }`}
              >
                {statusTextMap[invoice?.order_status_id] || "Không xác định"}
              </td>
              <td>
                {invoice?.order_status_id === "675ea35c101067cb13679b52" ? (
                  <button
                    className="h-6 text-gray-800 px-2 rounded-md bg-gray-300 r cursor-pointer hover:text-primary hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => handleOrderCompletion(invoice._id)}
                  >
                    Thanh toán
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderInvoices;
