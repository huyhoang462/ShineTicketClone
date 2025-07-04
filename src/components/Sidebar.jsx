// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  TicketIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  XMarkIcon,
  Bars3Icon, // Icon đóng
} from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    {
      name: "Vé đã mua",
      path: "/my-tickets",
      icon: <TicketIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Sự kiện đã tạo",
      path: "/my-events",
      icon: <CalendarDaysIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Tạo sự kiện",
      path: "/create-event",
      icon: <PencilSquareIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Tài khoản",
      path: "/my-account",
      icon: <UserCircleIcon className="h-6 inline mr-2" />,
    },
    {
      name: "Trở về",
      path: "/",
      icon: <ArrowLeftIcon className="h-6 inline mr-2" />,
    },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`
           w-16 lg:w-56 xl:w-64 bg-bg-main text-white border-r-2 border-[#A19393] font-bold text-lg h-screen
          fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out
          lg:sticky lg:transform-none lg:transition-none 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="py-4 flex items-center justify-center px-4">
          <div className=" w-full flex items-center justify-center ">
            <img src="/shineticket.png" className="h-20 hidden lg:flex" />
          </div>
          <button onClick={handleClose} className="lg:hidden mb-12">
            <Bars3Icon className="h-8 w-8 text-white" />
          </button>
        </div>
        <ul>
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              onClick={handleClose}
              className={({ isActive }) =>
                `h-15 px-[14px]  cursor-pointer flex items-center transition-colors ${
                  isActive
                    ? "bg-[#393F4E] font-bold text-primary"
                    : "hover:bg-[#393F4E] font-normal hover:text-primary"
                }`
              }
            >
              {item.icon}
              <span className="hidden lg:flex">{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
