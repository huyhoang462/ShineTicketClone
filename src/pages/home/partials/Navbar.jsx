import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full bg-black">
      <div className="max-w-screen-xl px-4 mx-auto">
        <nav className="flex items-center  h-12 md:h-14 lg:h-16 ">
          <Link className=" cursor-pointer text-white no-underline font-medium px-3 hover:text-primary">
            Nhạc sống
          </Link>
          <Link className=" cursor-pointer text-white no-underline font-medium px-3 hover:text-primary">
            Sân khấu & Nghệ thuật
          </Link>
          <Link className=" cursor-pointer text-white no-underline font-medium px-3 hover:text-primary">
            Thể thao
          </Link>
          <Link className=" cursor-pointer text-white no-underline font-medium px-3 hover:text-primary">
            Khác
          </Link>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;
