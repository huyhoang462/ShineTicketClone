import React, { useState } from "react";
import TicketType from "./partials/TicketType";
import CartSummary from "./partials/CartSummary";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "../../services";
const TicketSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [ticketQuantities, setTicketQuantities] = useState({});

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["eventForSelection", eventId],
    queryFn: () => eventService.getEventById(eventId),
    initialData: location.state?.event,
    enabled: !!eventId,
  });

  const setQuantity = (type, quantity) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [type]: quantity,
    }));
  };

  const cartItems = event?.tickets
    .filter((ticket) => ticketQuantities[ticket.ticketType] > 0)
    .map((ticket) => ({
      ticket_id: ticket.id,
      ticket_type: ticket.ticketType,
      price: ticket.price,
      quantity: ticketQuantities[ticket.ticketType],
      total: ticket.price * ticketQuantities[ticket.ticketType],
    }));

  const total = cartItems?.reduce((sum, item) => sum + item.total, 0);
  if (isLoading && !location.state?.event) {
    return (
      <div className="bg-bg-main min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-bg-main min-h-screen flex justify-center items-center text-center text-white">
        <div>
          <h2 className="text-2xl text-red-500 font-bold">Đã có lỗi xảy ra</h2>
          <p className="text-gray-400 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }
  return (
    <div className="relative min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] bg-gray-950 space-y-4 lg:space-y-0 lg:space-x-4">
      <div className=" lg:w-3/4">
        <div className="relative pt-10 mb-8">
          <button
            onClick={() => navigate(`/ticket-details/${eventId}`)}
            className="absolute left-1/18 md:left-1/11   lg:left-1/7 top-11 cursor-pointer hover:text-gray-200 flex items-center gap-2 text-primary font-bold text-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h2 className="text-primary text-center text-xl font-bold mb-4">
            Chọn vé
          </h2>
        </div>

        <div className="w-full lg:w-3/4 px-10  md:px-20 lg:px-4 mx-auto">
          {event?.tickets.map((ticket) => (
            <TicketType
              key={ticket.ticketType}
              name={ticket.ticketType}
              price={ticket.price.toLocaleString()}
              soldOut={ticket.status}
              description={ticket.description}
              quantity={ticketQuantities[ticket.ticketType] || 0}
              setQuantity={(quantity) =>
                setQuantity(ticket.ticketType, quantity)
              }
            />
          ))}
        </div>
      </div>
      <div className="hidden lg:block w-80  xl:w-[340px] absolute top-0 right-[-16px] h-[100%]">
        <CartSummary items={cartItems} total={total} event={event} />
      </div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 p-4 border-t border-gray-700  flex justify-between items-center">
        <div>
          <span className="text-gray-400 text-sm">Tổng cộng</span>
          <p className="text-primary font-bold text-xl">
            {total.toLocaleString()} đ
          </p>
        </div>
        <button
          onClick={() =>
            navigate("/payment", { state: { items: cartItems, total, event } })
          }
          className="bg-primary text-black cursor-pointer hover:bg-white hover:text-black font-semibold py-2 px-6 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={!cartItems || cartItems.length === 0}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default TicketSelectionPage;
