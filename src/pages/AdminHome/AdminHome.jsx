import React, { useEffect, useState } from "react";
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
} from "recharts";
import * as XLSX from "xlsx";

export default function AdminHome() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderApi = await orderService.getAllOrders();
        setOrders(orderApi);
        setFilteredOrders(orderApi);
      } catch (error) {
        console.error("Error fetching refund:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrdersByDate();
  }, [dateRange, orders]);

  const filterOrdersByDate = () => {
    if (!dateRange.startDate && !dateRange.endDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.order_date);
      const start = dateRange.startDate
        ? new Date(dateRange.startDate)
        : new Date(0);
      const end = dateRange.endDate
        ? new Date(dateRange.endDate)
        : new Date(8640000000000000);
      return orderDate >= start && orderDate <= end;
    });

    setFilteredOrders(filtered);
  };

  const calculateStats = () => {
    const totalRevenue = filteredOrders.reduce(
      (sum, order) => sum + parseFloat(order.total_amount),
      0
    );
    const serviceFee = totalRevenue * 0.1;

    const eventStats = filteredOrders.reduce((acc, order) => {
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

    const monthlyStats = filteredOrders.reduce((acc, order) => {
      const month = new Date(order.order_date).toLocaleString("vi-VN", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = {
          month,
          revenue: 0,
          serviceFee: 0,
        };
      }
      const amount = parseFloat(order.total_amount);
      acc[month].revenue += amount;
      acc[month].serviceFee += amount * 0.1;
      return acc;
    }, {});

    return {
      totalRevenue,
      serviceFee,
      eventStats: Object.values(eventStats),
      monthlyStats: Object.values(monthlyStats),
    };
  };

  const exportToExcel = () => {
    const stats = calculateStats();

    // Prepare data for export
    const workbook = XLSX.utils.book_new();

    // Summary sheet
    const summaryData = [
      ["Báo cáo doanh thu"],
      [
        "Thời gian",
        `${dateRange.startDate || "Tất cả"} - ${dateRange.endDate || "Tất cả"}`,
      ],
      [""],
      ["Tổng doanh thu", stats.totalRevenue],
      ["Tổng phí dịch vụ (10%)", stats.serviceFee],
      ["Số đơn hàng", filteredOrders.length],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Tổng quan");

    // Events sheet
    const eventsData = [
      ["Tên sự kiện", "Doanh thu", "Phí dịch vụ", "Số đơn"],
      ...stats.eventStats.map((event) => [
        event.eventName,
        event.revenue,
        event.revenue * 0.1,
        event.orderCount,
      ]),
    ];
    const eventsSheet = XLSX.utils.aoa_to_sheet(eventsData);
    XLSX.utils.book_append_sheet(workbook, eventsSheet, "Theo sự kiện");

    // Monthly sheet
    const monthlyData = [
      ["Tháng", "Doanh thu", "Phí dịch vụ"],
      ...stats.monthlyStats.map((stat) => [
        stat.month,
        stat.revenue,
        stat.serviceFee,
      ]),
    ];
    const monthlySheet = XLSX.utils.aoa_to_sheet(monthlyData);
    XLSX.utils.book_append_sheet(workbook, monthlySheet, "Theo tháng");

    // Export file
    XLSX.writeFile(workbook, "bao-cao-doanh-thu.xlsx");
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gray-950">
      {/* Bộ lọc và nút xuất báo cáo */}
      <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-900 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center">
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
              className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
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
              className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          onClick={exportToExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Xuất báo cáo
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Tổng doanh thu</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {stats.totalRevenue.toLocaleString()} VND
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">
            Tổng phí dịch vụ (10%)
          </h3>
          <p className="text-2xl font-bold text-white mt-2">
            {stats.serviceFee.toLocaleString()} VND
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Số đơn hàng</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {filteredOrders.length} đơn
          </p>
        </div>
      </div>

      {/* Biểu đồ doanh thu và phí theo tháng */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-300 text-lg font-medium mb-4">
          Doanh thu và phí dịch vụ theo tháng
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stats.monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              name="Doanh thu"
            />
            <Line
              type="monotone"
              dataKey="serviceFee"
              stroke="#82ca9d"
              name="Phí dịch vụ"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top sự kiện có doanh thu cao nhất */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-300 text-lg font-medium mb-4">
          Top sự kiện theo doanh thu
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-gray-300">
                  Tên sự kiện
                </th>
                <th className="px-4 py-3 text-left text-gray-300">Doanh thu</th>
                <th className="px-4 py-3 text-left text-gray-300">
                  Phí dịch vụ
                </th>
                <th className="px-4 py-3 text-left text-gray-300">Số đơn</th>
              </tr>
            </thead>
            <tbody>
              {stats.eventStats
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map((event) => (
                  <tr key={event.eventId} className="border-b border-gray-800">
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

      {/* Biểu đồ phân bố doanh thu theo sự kiện */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h3 className="text-gray-300 text-lg font-medium mb-4">
          Phân bố doanh thu theo sự kiện
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={stats.eventStats
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 10)}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="eventName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
