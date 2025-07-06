import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TicketIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user_id")
  );

  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const accountMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchText.trim() || searchText == "") {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAccountMenuVisible(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const closeAllMenus = () => {
    setIsAccountMenuVisible(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-primary w-full fixed top-0 left-0 right-0 z-20 shadow-md">
        <div className=" lg:max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center h-12 md:h-14 lg:h-16">
            <Link to="/" onClick={closeAllMenus}>
              <img
                src="/Logo.png"
                alt="Logo ShineTicket"
                className="h-8 md:h-10 lg:h-12"
              />
            </Link>

            <div className="hidden lg:flex items-center ">
              <div className="relative">
                <input
                  spellCheck="false"
                  type="text"
                  placeholder="Bạn tìm gì hôm nay?"
                  className="pl-4 pr-10 py-2 rounded-md  w-xs bg-white text-gray-600 outline-none focus:ring-1 focus:ring-gray-800 "
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                <MagnifyingGlassIcon
                  className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-800"
                  onClick={handleSearch}
                />
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-3   ">
              {isLoggedIn ? (
                <div className="hidden lg:flex items-center space-x-3   ">
                  <Link
                    to="/create-event"
                    className="border-2 cursor-pointer border-solid border-white text-white font-semibold px-5 py-1.5 rounded-full hover:bg-white hover:text-primary transition-colors"
                  >
                    Tạo sự kiện
                  </Link>
                  <Link
                    to="/my-tickets"
                    className="flex cursor-pointer items-center border-2 border-solid border-white px-5 py-1.5 rounded-full text-white font-semibold hover:bg-white hover:text-primary"
                  >
                    <TicketIcon className="h-6 w-6 mr-2" />
                    Vé đã mua
                  </Link>

                  <div className="relative" ref={accountMenuRef}>
                    <button
                      onClick={() =>
                        setIsAccountMenuVisible(!isAccountMenuVisible)
                      }
                      className="flex items-center cursor-pointer text-white font-semibold"
                    >
                      <UserCircleIcon className="h-7 w-7 mr-2" />
                      {"Tài khoản"}
                      <ChevronDownIcon
                        className={`h-5 w-5 ml-1 transition-transform ${
                          isAccountMenuVisible ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isAccountMenuVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        <Link
                          to="/my-account"
                          onClick={() => setIsAccountMenuVisible(false)}
                          className="flex items-center cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <UserCircleIcon className="h-5 w-5 mr-2" />
                          Tài khoản của tôi
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 mr-2" />
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-50"></div>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center cursor-pointer text-white font-semibold hover:text-gray-200 mr-2"
                  >
                    <UserCircleIcon className="h-7 w-7 mr-2" />
                    Đăng nhập
                  </button>
                </>
              )}
            </div>

            <div className="lg:hidden">
              <button
                className=" cursor-pointer"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-8 w-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onSearch={handleSearch}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </>
  );
};

export default Header;
