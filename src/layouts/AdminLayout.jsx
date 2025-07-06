import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");

    navigate("/");
  };

  return (
    <div className="flex bg-[#030712] text-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-[#111827] h-16 w-[calc(100%-16rem)] fixed top-0 z-10 flex items-center justify-end px-6">
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            title="Đăng xuất"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            <span>Đăng xuất</span>
          </button>
        </header>
        <main className="flex-1 pt-16">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
