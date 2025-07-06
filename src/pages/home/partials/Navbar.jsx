// src/pages/home/partials/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Tạo một mảng để dễ quản lý và lặp
  const categories = [
    { name: "Nhạc sống", path: "/search?category=Nhạc sống" },
    {
      name: "Sân khấu & Nghệ thuật",
      path: "/search?category=Sân khấu & Nghệ thuật",
    },
    { name: "Thể thao", path: "/search?category=Thể thao" },
    { name: "Khác", path: "/search?category=Khác" },
  ];

  return (
    <div className="w-full bg-black">
      <div className="max-w-screen-xl px-4 mx-auto">
        <nav className="flex items-center h-12 md:h-14 lg:h-16">
          {categories.map((category) => (
            <Link
              key={category.name}
              // Sử dụng encodeURIComponent để mã hóa các ký tự đặc biệt trong URL
              to={`/search?category=${encodeURIComponent(category.name)}`}
              className="cursor-pointer text-white no-underline font-medium px-3 hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
