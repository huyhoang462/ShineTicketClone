/* eslint-disable no-undef */
// src/pages/Payment.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services";
import { useCountdown } from "../../hooks/useCountdown";

import Timer from "./partials/Timer";
import MomoPaymentModal from "./partials/MomoPaymentModal";
import EventInfo from "./partials/EventInfo";
import CartInfo from "./partials/CartInfo";
import PaymentInfo from "./partials/PaymentInfo";

const STATUS_PENDING = "675ea35c101067cb13679b52";
const STATUS_COMPLETED = "675ea365101067cb13679b55";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, total, event } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const orderIdRef = useRef(null);

  // Ref để ngăn useEffect chạy 2 lần trong StrictMode
  const effectRan = useRef(false);

  // --- MUTATION ĐỂ HỦY ĐƠN HÀNG ---
  const deleteOrderMutation = useMutation({
    mutationFn: (id) => orderService.deleteOrder(id),
    onSuccess: () =>
      console.log(`[SUCCESS] Đã hủy đơn hàng ${orderIdRef.current}`),
    onError: (error) =>
      console.error(
        `[ERROR] Lỗi khi hủy đơn hàng ${orderIdRef.current}:`,
        error
      ),
  });

  const handleCancelOrder = useCallback(() => {
    if (orderIdRef.current) {
      deleteOrderMutation.mutate(orderIdRef.current);
    }
    navigate("/");
  }, [deleteOrderMutation, navigate]);

  // --- LOGIC COUNTDOWN ---
  const { minutes, seconds } = useCountdown(15, () => {
    toast.warn("Đã hết thời gian giữ vé, đơn hàng sẽ bị hủy.");
    handleCancelOrder();
  });

  // --- MUTATION ĐỂ TẠO ĐƠN HÀNG ---
  const createOrderMutation = useMutation({
    mutationFn: (orderData) => orderService.createOrder(orderData),
    onSuccess: (response) => {
      if (response?.data?._id) {
        const newOrderId = response.data._id;
        setOrderId(newOrderId);
        orderIdRef.current = newOrderId;
        console.log(`[SUCCESS] Đã tạo đơn hàng tạm thời với ID: ${newOrderId}`);
      } else {
        toast.error("Lỗi: Không nhận được ID đơn hàng hợp lệ.");
        navigate("/");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Không thể tạo đơn hàng.";
      console.error("[ERROR] Lỗi khi tạo đơn hàng:", errorMessage, error);
      toast.error("Lỗi khi tạo đơn hàng!");
      navigate("/");
    },
  });

  const completeOrderMutation = useMutation({
    mutationFn: (id) => orderService.editOrder(id, STATUS_COMPLETED),
    onSuccess: () => {
      toast.success("Thanh toán thành công! Cảm ơn bạn.");
      queryClient.invalidateQueries({ queryKey: ["myTickets"] });
      orderIdRef.current = null;
      navigate("/my-tickets");
    },
    onError: (error) => {
      console.error(
        `[ERROR] Lỗi khi hoàn tất đơn hàng ${orderIdRef.current}:`,
        error
      );
      toast.error(
        "Không thể xác nhận thanh toán! Nếu bạn đã thanh toán, vui lòng liên hệ hỗ trợ."
      );
    },
  });

  const handleOrderCompletion = () => {
    if (orderId) {
      console.log(
        `[ACTION] Người dùng nhấn "Hoàn tất" cho đơn hàng ID: ${orderId}`
      );
      completeOrderMutation.mutate(orderId);
    } else {
      console.warn("[WARN] Người dùng nhấn 'Hoàn tất' nhưng chưa có orderId.");
    }
  };

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      if (!items || !total || !event) {
        navigate("/");
        return;
      }

      console.log("[EFFECT] Bắt đầu tạo đơn hàng...");
      const orderForm = {
        user_id: localStorage.getItem("user_id"),
        order_date: new Date().toISOString(),
        total_amount: total,
        event_id: event._id,
        event_name: event.event_name,
        event_date: event.start_date,
        event_address:
          event.event_format === "online"
            ? "Sự kiện online"
            : [
                event.venue_id?.venue_name,
                event.venue_id?.street_name,
                event.venue_id?.ward,
                event.venue_id?.district,
                event.venue_id?.city,
              ]
                .filter(Boolean)
                .join(", "),
        order_status_id: STATUS_PENDING,
        order_details: items.map((ticket) => ({
          ticket_id: ticket.ticket_id,
          ticket_type: ticket.ticket_type,
          ticket_date: event.start_date,
          price: ticket.price,
        })),
      };

      createOrderMutation.mutate(orderForm);

      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "Rời đi sẽ hủy đơn hàng của bạn. Bạn có chắc chắn?";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        console.log("[CLEANUP] Component Payment bị hủy.");
        window.removeEventListener("beforeunload", handleBeforeUnload);
        if (orderIdRef.current) {
          console.log(
            `[CLEANUP] Gửi yêu cầu hủy đơn hàng ID: ${orderIdRef.current}`
          );
          deleteOrderMutation.mutate(orderIdRef.current);
        }
      };
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, total, event]);

  if (!event) return null;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="bg-bg-main">
        <div className="flex flex-col max-w-7xl mx-auto md:flex-row text-white px-4 md:px-8 py-4 rounded-lg space-y-4 md:space-y-0 md:space-x-4">
          <EventInfo event={event} />
          <div className="w-full md:w-[14rem] h-full p-4 border border-white/40 rounded-2xl bg-white/25 backdrop-blur-xl flex flex-col justify-center items-center gap-2">
            <span className="text-sm">Hoàn tất trong</span>
            <Timer minutes={minutes} seconds={seconds} />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
        <div className="lg:col-span-2">
          <PaymentInfo info={event?.organizer_id} />
        </div>
        <div className="space-y-4">
          <CartInfo
            items={items}
            total={total}
            onOpen={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <MomoPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={total}
        info={event?.organizer_id}
        onComplete={handleOrderCompletion}
        isCompleting={completeOrderMutation.isPending}
      />
    </div>
  );
}
