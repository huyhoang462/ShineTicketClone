/* eslint-disable no-unused-vars */
import React from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

const PaymentEventList = ({ events, onPay, onViewDetails, onSearch }) => {
  return (
    <div className="mt-4">
      <div className="lg:hidden space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 text-sm text-gray-200 shadow-md"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-base text-white pr-4">
                {event?.event_name}
              </h3>
              <button onClick={() => onViewDetails(event)} title="Xem chi tiết">
                <EyeIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:text-primary transition-colors" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Ngày kết thúc:</span>
                <span className="font-medium">
                  {new Date(event?.end_date).toLocaleDateString("vi-VN", {
                    timeZone: "UTC",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tiền thu được:</span>
                <span className="font-medium">
                  {event?.event_total_amount?.toLocaleString()} VND
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cần thanh toán:</span>
                <span className="font-bold text-primary">
                  {((event?.event_total_amount * 10) / 100)?.toLocaleString()}{" "}
                  VND
                </span>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-3 pt-3">
              <p className="text-gray-400 text-xs">Thông tin thanh toán:</p>
              <p className="font-mono text-white">
                {event?.organizer_id?.account_number} -{" "}
                {event?.organizer_id?.bank_name}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 shadow-md rounded-lg hidden lg:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Tên sự kiện
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Ngày kết thúc
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Số tiền thu được
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Số tiền cần thanh toán
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Thông tin thanh toán
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {events.map((event, index) => (
              <tr key={index} className="hover:bg-gray-800 text-gray-200">
                <td className="px-4 py-3 whitespace-nowrap font-medium">
                  {event?.event_name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(event?.end_date).toLocaleDateString("vi-VN", {
                    timeZone: "UTC",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {event?.event_total_amount?.toLocaleString()} VND
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-semibold text-primary">
                  {((event?.event_total_amount * 10) / 100)?.toLocaleString()}{" "}
                  VND
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-mono">
                  {event?.organizer_id?.account_number} -{" "}
                  {event?.organizer_id?.bank_name}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onViewDetails(event)}
                    title="Xem chi tiết"
                  >
                    <EyeIcon className="h-6 w-6 text-gray-400 cursor-pointer hover:text-primary transition-colors duration-200" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentEventList;
