import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartPieIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  DocumentCurrencyBangladeshiIcon,
} from "@heroicons/react/24/outline";

const AdminSidebar = () => {
  const menuItems = [
    {
      name: "Doanh thu",
      path: "dashboard",
      icon: <ChartPieIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Sự kiện",
      path: "events",
      icon: <CalendarDaysIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Chờ thanh toán",
      path: "pay",
      icon: <BanknotesIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Hóa đơn",
      path: "invoices",
      icon: <DocumentCurrencyBangladeshiIcon className="h-6 inline mr-2" />,
    },
  ];

  return (
    <div className="w-64 bg-[#111827] text-white   border-[#A19393] font-bold text-lg fixed h-screen ">
      <div className="  py-4">
        <img src="/shineticket.png" className="h-24 mx-auto" />
      </div>
      <ul>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `h-16 px-8 cursor-pointer flex items-center ${
                isActive
                  ? "bg-[#030712] text-primary"
                  : "hover:bg-[#030712] hover:text-primary"
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

export default AdminSidebar;
