/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "./partials/Timer";
import MomoPaymentModal from "./partials/MomoPaymentModal";
import EventInfo from "./partials/EventInfo";
import CartInfo from "./partials/CartInfo";
import PaymentInfo from "./partials/PaymentInfo";
import { ToastContainer, toast } from "react-toastify";
import { orderService } from "../../services";
export default function Payment() {
  const location = useLocation();
  const { items, total, event } = location.state || {};
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const createInitialOrder = async () => {
      const order_details = items.map((ticket) => ({
        ticket_id: ticket.ticket_id,
        ticket_type: ticket.ticket_type,
        ticket_date: event.start_date,
        price: ticket.price,
      }));
      const userId = localStorage.getItem("user_id");
      const orderForm = {
        user_id: userId,
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
        order_status_id: "675ea35c101067cb13679b52",
        order_details: order_details,
      };

      try {
        const tempOrder = await orderService.createOrder(orderForm);
        setOrderId(tempOrder.data._id);
        toast.info("Đơn hàng tạm thời đã được tạo");
        console.log(tempOrder.data._id);
      } catch (error) {
        toast.error("Không thể tạo đơn hàng!");
      }
    };

    createInitialOrder();
  }, []);
  useEffect(() => {
    const timerId = setInterval(() => {
      if (seconds === 0 && minutes === 0) {
        handleCancelOrder();
        navigate("/");
        clearInterval(timerId);
      } else {
        if (seconds <= 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);
  const handleOrderCompletion = async () => {
    if (orderId) {
      try {
        await orderService.editOrder(orderId, "675ea365101067cb13679b55");
        console.log("thanh tonas xong");
        toast.success("Thanh toán thành công!");
        navigate("/");
      } catch (error) {
        toast.error("Không thể hoàn tất thanh toán!");
      }
    }
  };
  const handleCancelOrder = async () => {
    if (orderId) {
      try {
        await orderService.deleteOrder(orderId);
        toast.info("Đơn hàng đã bị hủy do hết thời gian thanh toán.");
        navigate("/");
      } catch (error) {
        toast.error("Không thể hủy đơn hàng!");
      }
    }
  };
  return (
    <div className="bg-black text-white  min-h-screen ">
      <div className="bg-bg-main  bg-cover bg-center ">
        <div className="flex flex-col max-w-7xl mx-auto  md:flex-row text-white px-8 pt-4 pb-4 rounded-lg  space-y-4 md:space-y-0 md:space-x-4">
          <EventInfo event={event} />
          <div className="w-[14rem] h-full px-4 pt-6 pb-4 border border-white/40 overflow-hidden  rounded-3xl bg-white/25 backdrop-blur-xl backdrop-brightness-90 flex justify-center items-center flex-col gap-4">
            <span className="">Hoàn tất đặt vé trong</span>
            <Timer minutes={minutes} seconds={seconds} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 ">
          <PaymentInfo info={event.organizer_id} />
        </div>
        <div className="space-y-4 mr-4 mt-6 max-w-[25rem]">
          <CartInfo items={items} total={total} />
          <button
            className="bg-primary rounded-lg px-4"
            onClick={handleOrderCompletion}
          >
            Hoàn tất
          </button>
        </div>
      </div>

      <MomoPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={total}
        info={event?.organizer_id}
      />
      <ToastContainer />
    </div>
  );
}
