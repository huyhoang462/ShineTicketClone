import React, { useState } from "react";
import CodeModal from "./CodeModal";
import QRCode from "react-qr-code";

export default function TicketCard({ ticket }) {
  const [isQRCodeVisible, setQRCodeVisible] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-bg-main p-4 rounded-lg shadow-md text-white w-full border border-gray-700">
        <div className="flex flex-1 flex-col sm:flex-row gap-4 items-center">
          <div className="w-32 flex items-center">
            <img
              src={"/shineticket.png"}
              alt={ticket?.event_name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold mb-2">{ticket?.event_name}</h3>
            <p className="text-gray-400 mb-1">
              📅{" "}
              {new Date(ticket?.ticket_date).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="text-gray-400 mb-1">📍 {ticket?.event_address}</p>
            <p className="text-gray-400">
              <span className="font-semibold">Loại:</span> {ticket?.ticket_type}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center md:items-end mt-4 md:mt-0 md:ml-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-700">
          <p className="text-lg font-bold text-primary mb-2 md:mb-0">
            {parseFloat(ticket?.price).toLocaleString()} VNĐ
          </p>
          <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full justify-between md:justify-end">
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold mt-2 ${
                new Date(ticket?.ticket_date).toISOString().split("T")[0] >
                new Date().toISOString().split("T")[0]
                  ? "bg-green-600 text-white"
                  : new Date(ticket?.ticket_date)
                      .toISOString()
                      .split("T")[0] === new Date().toISOString().split("T")[0]
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-600 text-gray-300"
              }`}
            >
              {new Date(ticket?.ticket_date).toISOString().split("T")[0] >
              new Date().toISOString().split("T")[0]
                ? "Sắp diễn ra"
                : new Date(ticket?.ticket_date).toISOString().split("T")[0] ===
                  new Date().toISOString().split("T")[0]
                ? "Đang diễn ra"
                : "Đã kết thúc"}
            </span>
            <button
              onClick={() => setQRCodeVisible(true)}
              className="mt-2 md:mt-4 cursor-pointer bg-primary text-black px-4 py-1 rounded-lg"
            >
              Xuất vé
            </button>
          </div>
        </div>
      </div>

      {isQRCodeVisible && (
        <CodeModal onClose={() => setQRCodeVisible(false)}>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              {ticket?.event_name}
            </h3>
            <div className="bg-white p-4 rounded-lg">
              <QRCode value={ticket?.ticket_id} size={200} />
            </div>
            <p className="text-gray-400 mt-4">Mã vé: {ticket?.ticket_id}</p>
            <button
              onClick={() => setQRCodeVisible(false)}
              className="mt-6 w-full cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Đóng
            </button>
          </div>
        </CodeModal>
      )}
    </>
  );
}
