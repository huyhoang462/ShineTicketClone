import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "../../services";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import * as XLSX from "xlsx";

const EventSummary = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderApi = await orderService.getAllOrders(id);
        setOrders(orderApi);
      } catch (error) {
        console.error("Error fetching refund:", error);
        toast.error("Không thể tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [id]);

  const calculateStats = () => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + parseFloat(order.total_amount),
      0
    );

    const totalTickets = orders.reduce(
      (sum, order) => sum + order.order_details.length,
      0
    );

    const ticketTypeStats = orders.reduce((acc, order) => {
      order.order_details.forEach((ticket) => {
        if (!acc[ticket.ticket_type]) {
          acc[ticket.ticket_type] = 0;
        }
        acc[ticket.ticket_type]++;
      });
      return acc;
    }, {});

    return { totalRevenue, totalTickets, ticketTypeStats };
  };

  const prepareRevenueData = () => {
    const revenueByDate = orders.reduce((acc, order) => {
      const date = new Date(order.order_date).toLocaleDateString("vi-VN");
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += parseFloat(order.total_amount);
      return acc;
    }, {});

    return Object.entries(revenueByDate).map(([date, amount]) => ({
      date,
      amount,
    }));
  };

  const filterOrdersByDate = () => {
    return orders.filter((order) => {
      const orderDate = new Date(order.order_date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return orderDate >= start && orderDate <= end;
    });
  };

  const stats = calculateStats();
  const revenueData = prepareRevenueData();
  const filteredOrders = filterOrdersByDate();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const exportToExcel = () => {
    const summaryData = [
      {
        label: "Tổng doanh thu",
        value:
          filteredOrders.reduce(
            (total, order) => total + parseFloat(order.total_amount),
            0
          ) + " VND",
      },
      {
        label: "Tổng số vé đã bán",
        value:
          filteredOrders.reduce(
            (total, order) => total + order.order_details.length,
            0
          ) + " vé",
      },
      { label: "Số đơn hàng", value: filteredOrders.length + " đơn" },
    ];

    const detailData = filteredOrders.map((order) => ({
      order_date: order.order_date,
      total_amount: order.total_amount,
      event_name: order.event_name,
      event_date: order.event_date,
      order_details: order.order_details
        .map((ticket) => `${ticket.ticket_type} - ${ticket.price} VND`)
        .join(", "),
    }));

    const ticketTypeDistribution = Object.entries(stats.ticketTypeStats).map(
      ([name, value]) => ({
        ticket_type: name,
        count: value,
      })
    );

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);

    const detailSheet = XLSX.utils.json_to_sheet(detailData);

    const ticketTypeSheet = XLSX.utils.json_to_sheet(ticketTypeDistribution);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, summarySheet, "Tổng quan");
    XLSX.utils.book_append_sheet(wb, detailSheet, "Chi tiết đơn hàng");
    XLSX.utils.book_append_sheet(wb, ticketTypeSheet, "Phân bố loại vé");

    XLSX.writeFile(wb, "bao_cao_doanh_thu.xlsx");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-200">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-950">
      {/* Lọc theo ngày */}

      <div className="mb-6 flex justify-between items-center">
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-700 text-gray-300 p-2 rounded-lg mr-4"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-700 text-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Nút xuất báo cáo */}
        <button
          onClick={exportToExcel}
          className=" bg-blue-600 p-2 rounded-lg text-white"
        >
          Xuất báo cáo Excel
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Tổng doanh thu</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {filteredOrders.reduce(
              (total, order) => total + parseFloat(order.total_amount),
              0
            )}{" "}
            VND
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">
            Tổng số vé đã bán
          </h3>
          <p className="text-2xl font-bold text-white mt-2">
            {filteredOrders.reduce(
              (total, order) => total + order.order_details.length,
              0
            )}{" "}
            vé
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium">Số đơn hàng</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {filteredOrders.length} đơn
          </p>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-lg font-medium mb-4">
            Doanh thu theo ngày
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                name="Doanh thu (VND)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-lg font-medium mb-4">
            Phân bố loại vé
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(stats.ticketTypeStats).map(
                  ([name, value]) => ({
                    name,
                    value,
                  })
                )}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.entries(stats.ticketTypeStats).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
