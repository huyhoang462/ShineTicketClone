// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const navigate = useNavigate();
  // 1. Thêm state để quản lý sidebar trên mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <div className="flex bg-[#030712] text-white min-h-screen relative">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <header className="bg-[#111827] h-16 flex items-center justify-between lg:justify-end px-6 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white"
          >
            <Bars3Icon className="h-8 w-8" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            title="Đăng xuất"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </header>

        <main className="flex-1 px-4 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
