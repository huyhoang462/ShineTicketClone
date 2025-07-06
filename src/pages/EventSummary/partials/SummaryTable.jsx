import React from "react";

const SummaryTable = ({ summaryData }) => {
  return (
    <div className="bg-bg-main text-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Tổng kết sự kiện</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Tiền bán vé:</span>
          <span>{summaryData.ticketRevenue} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Phí dịch vụ:</span>
          <span>{summaryData.serviceFee} đ</span>
        </div>
        <div className="flex justify-between">
          <span>Doanh thu:</span>
          <span>{summaryData.totalRevenue} đ</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryTable;
