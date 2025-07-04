/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { sEvent2 } from "../eventStore";

function TicketModal({ ticket, onSave, onClose, index }) {
  const ls = sEvent2.slice((n) => n.tickets).use();
  const tt = sEvent2.slice((n) => n.total_tickets).use();
  const [ticketData, setTicketData] = useState({
    ticket_type: "",
    price: 0,
    ticket_des: "",
    ticket_quantity: 0,
    event_datetime: "",
  });

  useEffect(() => {
    if (ticket) {
      setTicketData({
        ticket_type: ticket.ticket_type || "",
        price: Number(ticket.price) || 0,
        ticket_des: ticket.ticket_des || "",
        ticket_quantity: Number(ticket.ticket_quantity) || 0,
        event_datetime: ticket.event_datetime || "",
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatValue = value;

    if (name === "price" || name === "ticket_quantity") {
      formatValue = value === "" ? 0 : Number(value);
    }

    setTicketData((prevData) => ({ ...prevData, [name]: formatValue }));
  };

  const validateTicketData = (data) => {
    if (!data.ticket_type || data.ticket_type.trim() === "") {
      alert("Vui lòng nhập tên vé");
      return false;
    }

    if (!data.price || data.price <= 0) {
      alert("Giá vé phải lớn hơn 0");
      return false;
    }

    if (!data.ticket_quantity || data.ticket_quantity <= 0) {
      alert("Số lượng vé phải lớn hơn 0");
      return false;
    }

    if (!data.event_datetime) {
      alert("Vui lòng chọn ngày hiệu lực");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    const formattedData = {
      ...ticketData,
      price: ticketData.price,
      ticket_quantity: Number(ticketData.ticket_quantity),
      event_datetime: ticketData.event_datetime,
    };

    if (!validateTicketData(formattedData)) {
      return;
    }

    // Log dữ liệu để kiểm tra
    console.log("Formatted ticket data:", formattedData);

    onSave(formattedData, index);

    console.log(tt);
  };

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-bg-main p-6 rounded w-[70%] relative">
        <div
          className="absolute top-1 right-5 cursor-pointer p-1 text-red-600 text-2xl"
          onClick={onClose}
        >
          x
        </div>
        <h2 className="text-xl text-white text-center font-semibold mb-4">
          {ticket ? "Chỉnh sửa vé" : "Tạo loại vé mới"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 mb-6">
          <label className="text-white">
            <span className="text-[#C83030] font-bold text-lg">* </span> Tên vé
            <br />
            <input
              spellCheck="false"
              type="text"
              name="ticket_type"
              value={ticketData.ticket_type}
              onChange={handleChange}
              className="w-full text-black p-2 bg-white mt-2 border border-gray-600 rounded"
              required
            />
          </label>
          <label className="text-white">
            <span className="text-[#C83030] font-bold text-lg">* </span> Giá vé
            <br />
            <input
              type="number"
              name="price"
              min="0"
              value={ticketData.price}
              onChange={handleChange}
              className="w-full text-black p-2 bg-white mt-2 border border-gray-600 rounded"
              required
            />
          </label>
          <label className="text-white">
            <span className="text-[#C83030] font-bold text-lg">* </span> Tổng số
            vé
            <br />
            <input
              type="number"
              name="ticket_quantity"
              min="1"
              value={ticketData.ticket_quantity}
              onChange={handleChange}
              className="w-full text-black p-2 bg-white mt-2 border border-gray-600 rounded"
              required
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-6">
          <label className="text-white">
            <span className="text-[#C83030] font-bold text-lg">* </span> Ngày
            bắt đầu hiệu lực
            <br />
            <input
              type="date"
              name="event_datetime"
              value={ticketData.event_datetime}
              onChange={handleChange}
              className="w-full text-black p-2 bg-white mt-2 border border-gray-600 rounded"
              required
            />
          </label>
        </div>

        <label className="text-white">
          <span className="text-[#C83030] font-bold text-lg">* </span> Thông tin
          vé
          <br />
          <textarea
            spellCheck="false"
            name="ticket_des"
            value={ticketData.ticket_des}
            onChange={handleChange}
            className="w-full text-black p-2 bg-white mt-2 border border-gray-600 rounded"
          ></textarea>
        </label>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 w-full cursor-pointer hover:bg-white hover:text-black bg-primary text-lg text-white font-semibold rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketModal;
