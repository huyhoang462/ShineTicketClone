// src/pages/partials/CartSummary.jsx
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartSummary = ({ items, total, event, className = "" }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    if (items?.length) {
      navigate("/payment", { state: { items, total, event } });
    } else {
      toast.warning("Vui lòng chọn vé");
    }
  };

  const getFullAddress = () => {
    if (!event?.venue_id) return "";
    return [
      event.venue_id.street_name,
      event.venue_id.ward,
      event.venue_id.district,
      event.venue_id.city,
    ]
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div
      className={`bg-gray-900 flex flex-col justify-between text-white p-5 rounded-md h-full ${className}`}
    >
      <div>
        <div className="border-b border-gray-600 mb-4 pb-4">
          <h2 className="text-lg font-bold mb-4">{event?.event_name}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <CalendarDaysIcon className="inline h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <span>
                {event?.start_date &&
                  new Date(event.start_date).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </span>
            </div>
            <div className="flex items-start">
              <MapPinIcon className="inline h-5 w-5 text-primary mr-2 flex-shrink-0" />
              <div>
                <span className="font-semibold">
                  {event?.venue_id?.venue_name}
                </span>
                <span className="block text-gray-400">{getFullAddress()}</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-md font-semibold mb-2">Vé đã chọn</h3>
        {items && items.length > 0 ? (
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left py-1 font-normal">Loại vé</th>
                <th className="text-center py-1 font-normal">SL</th>
                <th className="text-right py-1 font-normal">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="text-left py-1">{item?.ticket_type}</td>
                  <td className="text-center py-1">{item?.quantity}</td>
                  <td className="text-right py-1">
                    {item.total.toLocaleString()} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center text-sm py-4">
            Chưa có vé nào được chọn.
          </p>
        )}
      </div>
      <div>
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Thành tiền</span>
          <span>{total.toLocaleString()} đ</span>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-primary cursor-pointer text-black font-semibold py-2 rounded-md hover:bg-white transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={!items || items.length === 0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
