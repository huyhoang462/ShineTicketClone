import React, { useEffect } from "react";

export default function HiddenSave({ items, total, event }) {
  useEffect(() => {
    const order_details = items.map((ticket) => ({
      ticket_id: ticket.ticket_id,
      ticket_type: ticket.ticket_type,
      ticket_date: event.start_date,
      price: ticket.price,
    }));
    const userId = localStorage.getItem("user_id");
    const orderForm = {
      user_id: userId, // có sẵn
      order_date: new Date().toISOString(),
      total_amount: total, // có sẵn
      event_id: event._id, // có sẵn
      event_name: event.event_name, // có săn
      event_date: event.start_date, //có sẵn
      event_address:
        event.event_format === "online"
          ? "Sự kiện online"
          : event.venue_id.venue_name +
            ", " +
            event.venue_id.street_name +
            ", " +
            event.venue_id.ward +
            ", " +
            event.venue_id.district +
            ", " +
            event.venue_id.city,
      order_status_id: "675ea35c101067cb13679b52",
      order_details: order_details,
    };
    console.log("dataaa: ", orderForm);
  }, []);
  return <div></div>;
}
