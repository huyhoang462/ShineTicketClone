import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

const OrderInvoices = ({ invoices }) => {
  const statusTextMap = {
    "675ea35c101067cb13679b52": "Chờ xử lý",
    "675ea365101067cb13679b55": "Đã xác nhận",
    "675ea36b101067cb13679b57": "Đã hủy",
  };

  const statusColorMap = {
    "675ea35c101067cb13679b52": "text-yellow-500", // Chờ xử lý
    "675ea365101067cb13679b55": "text-green-500", // Đã xác nhận
    "675ea36b101067cb13679b57": "text-red-500", // Đã hủy
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const groupTickets = (tickets) => {
    const grouped = {};

    tickets.forEach((ticket) => {
      const { ticket_type, ticket_date, price } = ticket;
      const key = `${ticket_type} - ${ticket_date}`;

      if (grouped[key]) {
        grouped[key].quantity += 1;
      } else {
        grouped[key] = { ticket_type, ticket_date, price, quantity: 1 };
      }
    });

    return Object.values(grouped);
  };

  return (
    <div className="bg-gray-900 shadow-lg rounded-lg mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2 text-left text-gray-300">STT</th>
            <th className="px-4 py-2 text-left text-gray-300">Tên sự kiện</th>
            <th className="px-4 py-2 text-left text-gray-300">Người mua</th>
            <th className="px-4 py-2 text-left text-gray-300">Số tiền</th>
            <th className="px-4 py-2 text-left text-gray-300">
              Ngày thanh toán
            </th>
            <th className="px-4 py-2 text-left text-gray-300">Trạng thái</th>
            <th className="px-4 py-2 text-left text-gray-300"></th>
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
                  statusColorMap[invoice?.order_status_id] || "text-gray-400"
                }`}
              >
                {statusTextMap[invoice?.order_status_id] || "Không xác định"}
              </td>
              <td>
                <EyeIcon
                  className="h-6 text-gray-300 cursor-pointer hover:text-primary transition-colors duration-200"
                  onClick={() => openModal(invoice)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl w-4/5 md:w-3/4 lg:w-2/3 max-w-3xl transform transition-all duration-300 scale-95 hover:scale-100 shadow-2xl text-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-400">
              Chi tiết hóa đơn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="">
                <strong className="text-lg text-gray-300">Tên sự kiện:</strong>{" "}
                {selectedInvoice?.event_name}
              </div>
              <div className="">
                <strong className="text-lg text-gray-300">Người mua:</strong>{" "}
                {selectedInvoice?.user_id?.username}
              </div>
              <div className="">
                <strong className="text-lg text-gray-300">Email:</strong>{" "}
                {selectedInvoice?.user_id?.email}
              </div>
              <div className="">
                <strong className="text-lg text-gray-300">SĐT:</strong>{" "}
                {selectedInvoice?.user_id?.phone_number}
              </div>
              <div className="">
                <strong className="text-lg text-gray-300">Số tiền:</strong>{" "}
                {parseFloat(selectedInvoice?.total_amount).toLocaleString()} VND
              </div>
              <div className="">
                <strong className="text-lg text-gray-300">
                  Ngày thanh toán:
                </strong>{" "}
                {new Date(selectedInvoice?.order_date).toLocaleDateString(
                  "vi-VN"
                )}
              </div>
            </div>

            <div className="my-4">
              <strong className="text-lg text-gray-300">Danh sách vé:</strong>
              <table className="min-w-full border-collapse mt-2">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-2 text-left text-gray-300">
                      Loại vé
                    </th>
                    <th className="px-4 py-2 text-left text-gray-300">Ngày</th>
                    <th className="px-4 py-2 text-left text-gray-300">
                      Số lượng
                    </th>
                    <th className="px-4 py-2 text-left text-gray-300">Giá</th>
                    <th className="px-4 py-2 text-left text-gray-300">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {groupTickets(selectedInvoice?.order_details || []).map(
                    (ticket, idx) => (
                      <tr key={idx} className="hover:bg-gray-700">
                        <td className="px-4 py-2">{ticket?.ticket_type}</td>
                        <td className="px-4 py-2">
                          {new Date(ticket?.ticket_date).toLocaleDateString(
                            "vi-VN",
                            {
                              timeZone: "UTC",
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-4 py-2">{ticket.quantity}</td>
                        <td className="px-4 py-2">
                          {parseFloat(ticket?.price).toLocaleString()} VND
                        </td>
                        <td className="px-4 py-2">
                          {(ticket.price * ticket.quantity).toLocaleString()}{" "}
                          VND
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-right mt-6">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                onClick={closeModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderInvoices;
