// src/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChartPieIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  DocumentCurrencyBangladeshiIcon,
  XMarkIcon, // Import icon đóng
} from "@heroicons/react/24/outline";

// 1. Nhận props isOpen và setIsOpen từ layout cha
const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    {
      name: "Doanh thu",
      path: "dashboard",
      icon: <ChartPieIcon className="h-6 inline mr-4" />,
    },
    {
      name: "Sự kiện",
      path: "events",
      icon: <CalendarDaysIcon className="h-6 inline mr-4" />,
    },
    {
      name: "Chờ thanh toán",
      path: "pay",
      icon: <BanknotesIcon className="h-6 inline mr-4" />,
    },
    {
      name: "Hóa đơn",
      path: "invoices",
      icon: <DocumentCurrencyBangladeshiIcon className="h-6 inline mr-4" />,
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`
          w-64 bg-[#111827] text-white font-bold text-lg h-screen
          fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out
          lg:sticky lg:transform-none lg:transition-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="py-4 flex items-center justify-between px-4">
          <img src="/shineticket.png" className="h-24 mx-auto" />
          <button
            onClick={handleClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
        <ul>
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              onClick={handleClose} // Đóng sidebar khi chọn một mục
              className={({ isActive }) =>
                `h-15 px-8 cursor-pointer flex items-center  transition-colors ${
                  isActive
                    ? "bg-[#030712] text-primary"
                    : "hover:bg-[#030712] font-medium hover:text-primary"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
