import React from "react";
import { Outlet } from "react-router-dom";

function AccessLayout() {
  return (
    <div>
      <main className="w-screen h-screen flex justify-center items-center bg-black">
        <Outlet />
      </main>
    </div>
  );
}

export default AccessLayout;
