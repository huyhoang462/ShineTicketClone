import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentInfo = ({ info }) => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };
  return (
    <div className="text-white p-4 rounded-lg space-y-4 bg-black">
      {/* Header */}
      <div className="flex justify-between items-center text-primary font-bold text-xl  border-gray-500 pb-2">
        <h2>THANH TOÁN</h2>
        <button
          className="text-sm text-gray-300 hover:text-primary underline"
          onClick={handleBack} // Gọi hàm quay lại
        >
          Chọn lại vé
        </button>
      </div>

      {/* Thông tin người nhận */}
      <div className="bg-bg-main p-6 rounded-lg shadow-md space-y-2">
        <h3 className="text-primary font-bold text-lg border-b border-gray-500 pb-2">
          Thông tin người nhận
        </h3>
        <div className="space-y-2 grid grid-cols-2">
          <div className="flex items-center">
            <span className="w-28 text-gray-400">Họ tên:</span>
            <span className="font-semibold">{info?.owner_name || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="w-28 text-gray-400">Số tài khoản:</span>
            <span className="font-semibold">
              {info?.account_number || "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-28 text-gray-400">SĐT:</span>
            <span className="font-semibold">
              {info?.organizer_phone_number || "N/A"}
            </span>
          </div>

          <div className="flex items-center">
            <span className="w-28 text-gray-400">Ngân hàng:</span>
            <span className="font-semibold">{info?.bank_name || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="w-28 text-gray-400">Email:</span>
            <span className="font-semibold">
              {info?.organizer_email || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="bg-bg-main p-6 rounded-lg shadow-md">
        <h3 className="text-primary font-bold text-lg border-b border-gray-500 pb-2">
          Phương thức thanh toán
        </h3>
        <div className="flex items-center mt-4">
          <input
            type="radio"
            id="momo"
            name="payment"
            className="mr-3 accent-primary"
            checked
          />
          <label htmlFor="momo" className="flex items-center cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
              alt="Momo"
              className="w-6 h-6 mr-2"
            />
            Ví momo
          </label>
        </div>
      </div>
    </div>
  );
};
export default PaymentInfo;
