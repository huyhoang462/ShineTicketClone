import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { orderService } from "../../services";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import * as XLSX from "xlsx";
import {
  ArrowDownTrayIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

// --- COMPONENT CON (để dễ quản lý) ---

const OverviewCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex items-start space-x-4">
    <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    <div>
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-2xl lg:text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-md shadow-lg border border-gray-700">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }} className="text-sm">
            {`${p.name}: ${p.value.toLocaleString()} VND`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- COMPONENT CHÍNH ---

export default function AdminHome() {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // 1. Dùng useQuery để lấy dữ liệu
  const { data: allOrders = [], isLoading } = useQuery({
    queryKey: ["allOrders"],
    queryFn: orderService.getAllOrders,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // Dữ liệu được coi là mới trong 5 phút
  });

  // 2. Dùng useMemo để lọc và tính toán thống kê
  const { filteredOrders, stats } = useMemo(() => {
    if (!allOrders || allOrders.length === 0) {
      return {
        filteredOrders: [],
        stats: {
          totalRevenue: 0,
          serviceFee: 0,
          eventStats: [],
          monthlyStats: [],
        },
      };
    }

    // Lọc đơn hàng theo ngày
    const filtered = allOrders.filter((order) => {
      if (!dateRange.startDate && !dateRange.endDate) return true;
      const orderDate = new Date(order.order_date);
      const start = dateRange.startDate
        ? new Date(dateRange.startDate)
        : new Date(0);
      const end = dateRange.endDate
        ? new Date(dateRange.endDate)
        : new Date(8640000000000000);
      if (end) end.setHours(23, 59, 59, 999); // Bao gồm cả ngày kết thúc
      return orderDate >= start && orderDate <= end;
    });

    // Tính toán các số liệu thống kê
    const totalRevenue = filtered.reduce(
      (sum, order) => sum + parseFloat(order.total_amount),
      0
    );
    const serviceFee = totalRevenue * 0.1;

    const eventStats = filtered.reduce((acc, order) => {
      const eventId = order.event_id._id;
      if (!acc[eventId]) {
        acc[eventId] = {
          eventId,
          eventName: order.event_name,
          revenue: 0,
          orderCount: 0,
        };
      }
      acc[eventId].revenue += parseFloat(order.total_amount);
      acc[eventId].orderCount += 1;
      return acc;
    }, {});

    const monthlyStats = filtered.reduce((acc, order) => {
      const monthYear = new Date(order.order_date).toLocaleString("vi-VN", {
        month: "2-digit",
        year: "numeric",
      });
      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, revenue: 0, serviceFee: 0 };
      }
      const amount = parseFloat(order.total_amount);
      acc[monthYear].revenue += amount;
      acc[monthYear].serviceFee += amount * 0.1;
      return acc;
    }, {});

    // Sắp xếp thống kê theo tháng
    const sortedMonthlyStats = Object.values(monthlyStats).sort((a, b) => {
      const [monthA, yearA] = a.month.split("/");
      const [monthB, yearB] = b.month.split("/");
      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });

    return {
      filteredOrders: filtered,
      stats: {
        totalRevenue,
        serviceFee,
        eventStats: Object.values(eventStats),
        monthlyStats: sortedMonthlyStats,
      },
    };
  }, [allOrders, dateRange]);

  // --- HÀM XUẤT EXCEL (KHÔNG ĐỔI) ---
  const exportToExcel = () => {
    /* ... giữ nguyên logic cũ của bạn ... */
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950 text-white">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-950">
      {/* Bộ lọc và nút xuất báo cáo */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-gray-900 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center w-full md:w-auto">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Từ ngày
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Đến ngày
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <button
          onClick={exportToExcel}
          className="w-full md:w-auto bg-primary cursor-pointer text-black px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Xuất báo cáo
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OverviewCard
          title="Tổng doanh thu"
          value={`${stats.totalRevenue.toLocaleString()} VND`}
          icon={<CurrencyDollarIcon className="h-6 w-6 text-white" />}
          color="bg-green-600"
        />
        <OverviewCard
          title="Tổng phí dịch vụ (10%)"
          value={`${stats.serviceFee.toLocaleString()} VND`}
          icon={<BanknotesIcon className="h-6 w-6 text-white" />}
          color="bg-yellow-600"
        />
        <OverviewCard
          title="Số đơn hàng"
          value={`${filteredOrders.length} đơn`}
          icon={<ShoppingCartIcon className="h-6 w-6 text-white" />}
          color="bg-blue-600"
        />
      </div>

      {/* Biểu đồ doanh thu theo tháng - đã cải tiến */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-300 text-lg font-medium mb-4">
          Doanh thu và phí dịch vụ theo tháng
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={stats.monthlyStats}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorFee" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="month" stroke="#a0aec0" />
            <YAxis
              stroke="#a0aec0"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Doanh thu"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="serviceFee"
              name="Phí dịch vụ"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorFee)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top sự kiện - Responsive */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-300 text-lg font-medium mb-4">
          Top sự kiện theo doanh thu
        </h3>
        {/* Mobile View */}
        <div className="lg:hidden space-y-4">
          {stats.eventStats
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5)
            .map((event) => (
              <div key={event.eventId} className="bg-gray-800 p-4 rounded-md">
                <p className="font-bold text-white">{event.eventName}</p>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-400">Doanh thu:</span>
                  <span className="font-semibold text-primary">
                    {event.revenue.toLocaleString()} VND
                  </span>
                </div>
              </div>
            ))}
        </div>
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">
                  Tên sự kiện
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">
                  Doanh thu
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">
                  Phí dịch vụ
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-400 uppercase">
                  Số đơn
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.eventStats
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map((event) => (
                  <tr
                    key={event.eventId}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="px-4 py-3 text-gray-200">
                      {event.eventName}
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      {event.revenue.toLocaleString()} VND
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      {(event.revenue * 0.1).toLocaleString()} VND
                    </td>
                    <td className="px-4 py-3 text-gray-200">
                      {event.orderCount}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
