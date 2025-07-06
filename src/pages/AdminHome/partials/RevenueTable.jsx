import React from "react";

const RevenueTable = ({ events }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h4 className="text-lg font-semibold mb-4">Danh sách doanh thu</h4>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Tên sự kiện
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Tổng doanh thu
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Số vé đã bán
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{event.name}</td>
              <td className="border border-gray-200 px-4 py-2">
                {event.revenue}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {event.ticketsSold}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {event.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTable;
