import React from "react";
import { Outlet, useParams } from "react-router-dom";
import EventSidebar from "../components/EventSidebar";

function EventLayout() {
  const { id } = useParams();

  return (
    <div className="flex bg-[#030712]">
      <EventSidebar id={id} />
      <main style={{ flex: 1 }}>
        <div className="flex items-center text-2xl pl-4 h-16 bg-[#111827] border-b-2 border-[#A19393] font-semibold text-white">
          Tổng kết sự kiện
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default EventLayout;
