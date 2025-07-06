// src/pages/partials/MomoPaymentModal.jsx
import React from "react";
import QRCode from "react-qr-code";

// Thêm các props mới: onComplete, isCompleting
const MomoPaymentModal = ({
  isOpen,
  onClose,
  amount,
  info,
  onComplete,
  isCompleting,
}) => {
  if (!isOpen) return null;

  const steps = [
    "Mở ứng dụng Momo trên điện thoại",
    "Trên Momo, chọn biểu tượng quét mã QR",
    "Quét mã QR ở trang này và thanh toán",
    "Sau khi thanh toán thành công, nhấn nút 'Hoàn tất thanh toán'",
  ];

  const qrData = JSON.stringify({
    amount,
    accountNumber: info?.account_number || "N/A",
    bankName: info?.bank_name || "N/A",
    ownerName: info?.owner_name || "N/A",
  });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative text-black">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
              alt="Momo"
              className="w-8 h-8"
            />
            <h2 className="text-xl font-semibold">Thanh toán bằng ví Momo</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 font-bold text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <QRCode value={qrData} size={200} />
            <p className="text-sm text-gray-600 mt-2 text-center">
              Quét mã để thanh toán <br />{" "}
              <span className="font-bold">{amount.toLocaleString()} VNĐ</span>
            </p>
          </div>

          <div className="flex-1 space-y-3">
            <h3 className="font-bold text-lg">Hướng dẫn thanh toán</h3>
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-black flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-300 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 cursor-pointer text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onComplete}
            disabled={isCompleting}
            className="bg-primary cursor-pointer text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:bg-gray-400 disabled:cursor-wait"
          >
            {isCompleting ? "Đang xử lý..." : "Hoàn tất thanh toán"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MomoPaymentModal;
