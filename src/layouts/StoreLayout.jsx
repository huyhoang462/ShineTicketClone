// src/layouts/StoreLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Đảm bảo đường dẫn đúng
import { Bars3Icon } from "@heroicons/react/24/outline"; // Icon Hamburger

function StoreLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex bg-black min-h-screen relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 relative bg-black">
        <div className=" absolute  p-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StoreLayout;
