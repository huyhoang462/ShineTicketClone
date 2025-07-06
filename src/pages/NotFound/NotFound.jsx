// src/pages/NotFoundPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-main text-white px-4">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-20 w-20 text-primary mb-4" />

        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
          404
        </h1>

        <p className="text-2xl md:text-3xl font-semibold text-gray-300 mt-4">
          Oops! Không tìm thấy trang
        </p>

        <p className="text-gray-400 mt-2 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>

        <Link
          to="/"
          className="inline-block bg-primary text-black font-bold text-lg px-8 py-3 rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
        >
          Quay về Trang Chủ
        </Link>
      </div>
    </div>
  );
}
