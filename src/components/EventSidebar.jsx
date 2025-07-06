import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartPieIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const EventSidebar = ({ id }) => {
  const menuItems = [
    {
      name: "Sự kiện đã tạo",
      path: "/my-events",
      icon: <ArrowLeftIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Tổng kết",
      path: `/summary/${id}`,
      icon: <ChartPieIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Đơn hàng",
      path: `/orders/${id}`,
      icon: <ShoppingCartIcon className="h-6 inline mr-2" />,
    },
  ];

  return (
    <div className="w-64 bg-[#111827] text-white border-r-2 border-[#A19393] font-bold text-lg  h-screen">
      <div className="  py-4">
        <img src="/shineticket.png" className="h-24 mx-auto" />
      </div>
      <ul className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `py-4 px-8 cursor-pointer flex items-center ${
                isActive
                  ? "bg-[#393F4E] text-primary"
                  : "hover:bg-[#393F4E] hover:text-primary"
              }`
            }
          >
            {item.icon}
            <li>{item.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default EventSidebar;
