import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

// Đăng ký các module cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ chartData }) => {
  // Kiểm tra dữ liệu hợp lệ
  if (!chartData || !chartData.sales || chartData.sales.length === 0) {
    return <p className="text-white">Không có dữ liệu để hiển thị biểu đồ</p>;
  }

  // Chuẩn bị dữ liệu cho biểu đồ
  const labels = chartData.sales.map((sale) => sale.date); // Các ngày bán vé
  const ticketsSoldData = chartData.sales.map((sale) => sale.ticketsSold); // Số vé bán
  const revenueData = chartData.sales.map((sale) => sale.revenue); // Doanh thu

  const data = {
    labels: labels, // Trục X là ngày
    datasets: [
      {
        label: "Số vé bán (vé)", // Số vé bán
        data: ticketsSoldData,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Màu nền
        borderColor: "rgba(54, 162, 235, 1)", // Màu viền
        borderWidth: 2,
        yAxisID: "y1", // Trục Y1
      },
      {
        label: "Doanh thu (VNĐ)", // Doanh thu
        data: revenueData,
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền
        borderWidth: 2,
        yAxisID: "y2", // Trục Y2
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      labels: {
        color: "rgba(255, 255, 255,1)",
      },
      title: {
        display: true,
        text: `Doanh thu bán vé từ ngày ${chartData.startDate} đến ${chartData.endDate}`,
        color: "rgba(255,255,255,1)",
        font: {
          size: 18, // Kích thước chữ của title
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Ngày",
          color: "rgba(255,255,255,1)",
          font: {
            size: 16, // Kích thước chữ của title
          },
        },
        ticks: {
          color: "rgba(255, 255, 255,1)", // Màu chữ của các ticks trên trục Y1
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Màu đường kẻ dọc (grid lines)
        },
      },
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Số vé bán (vé)",
          color: "rgba(255,255,255,1)",
          font: {
            size: 16, // Kích thước chữ của title
          },
        },
        ticks: {
          color: "rgba(255, 255, 255,1)", // Màu chữ của các ticks trên trục Y1
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Màu đường kẻ dọc (grid lines)
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
          color: "rgba(255,255,255,1)",
          font: {
            size: 16, // Kích thước chữ của title
          },
        },
        ticks: {
          color: "rgba(255, 255, 255,1)", // Màu chữ của các ticks trên trục Y1
        },
        grid: { drawOnChartArea: false }, // Không vẽ lưới trên trục này
      },
    },
  };

  return <Line className="bg-bg-main p-4 my-4" options={options} data={data} />;
};

export default RevenueChart;
