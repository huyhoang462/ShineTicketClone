import React, { useEffect, useState } from "react";
import OrderInvoices from "./partials/OrderInvoices";
import EventInvoices from "./partials/EventInvoices";
import { orderService } from "../../services";
import { toast } from "react-toastify";

const AdminInvoices = () => {
  const [orders, setOrders] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("order");

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const ordersFromApi = await orderService.getAllOrders();
      setOrders(ordersFromApi);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Không thể tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  const fetchRefund = async () => {
    setLoading(true);
    try {
      const refundApi = await orderService.getAllRefund();
      setRefunds(refundApi);
    } catch (error) {
      console.error("Error fetching refund:", error);
      toast.error("Không thể tải dữ liệu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
    fetchRefund();
  }, []);

  return (
    <div className="p-6 min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl text-gray-300 font-bold mb-4">Quản lý hóa đơn</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 cursor-pointer py-2 bg-gray-900 text-gray-300 rounded-lg ${
            activeTab === "order" ? "border border-gray-300" : ""
          }`}
          onClick={() => setActiveTab("order")}
        >
          Hóa đơn người mua vé
        </button>
        <button
          className={`px-4 py-2  cursor-pointer rounded-lg bg-gray-900 text-gray-300 ${
            activeTab === "event" ? "border border-gray-300" : " "
          }`}
          onClick={() => setActiveTab("event")}
        >
          Hóa đơn thanh toán cho tổ chức
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Đang tải...</div>
      ) : activeTab === "order" ? (
        <OrderInvoices invoices={orders} refresh={fetchEvents} />
      ) : (
        <EventInvoices invoices={refunds} />
      )}
    </div>
  );
};

export default AdminInvoices;
