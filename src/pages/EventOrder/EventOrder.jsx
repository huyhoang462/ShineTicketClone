import React, { useState, useEffect } from "react";
import OrderInvoices from "./partials/OrderInvoices";
import { useParams } from "react-router-dom";
import { orderService } from "../../services";

export default function EventOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orderApi = await orderService.getAllOrders(id);
        setOrders(orderApi);
      } catch (error) {
        console.error("Error fetching refund:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex-1  mx-auto">
      <div className="mx-6">
        <h2 className="text-white text-2xl font-medium mt-4">
          Danh sách đơn hàng
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Đang tải...</div>
        ) : (
          <OrderInvoices invoices={orders} />
        )}
      </div>
    </div>
  );
}
