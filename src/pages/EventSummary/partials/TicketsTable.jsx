import React from "react";
// TicketTable.jsx
const TicketTable = ({ tickets, date }) => {
  return (
    <div className="bg-bg-main text-white p-6 rounded-md shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Vé bán cho ngày {date}</h2>
      <table className="w-full text-left  border-collapse border border-gray-700">
        <thead>
          <tr className="">
            <th className="p-2 border border-gray-600">Loại vé</th>
            <th className="p-2 border border-gray-600">Giá vé</th>
            <th className="p-2 border border-gray-600">Tổng vé</th>
            <th className="p-2 border border-gray-600">Đã bán</th>
            <th className="p-2 border border-gray-600">Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index} className="">
              <td className="p-2 border border-gray-600">{ticket.type}</td>
              <td className="p-2 border border-gray-600">{ticket.price} đ</td>
              <td className="p-2 border border-gray-600">{ticket.total}</td>
              <td className="p-2 border border-gray-600">{ticket.sold}</td>
              <td className="p-2 border border-gray-600">{ticket.revenue} đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TicketTable;
