import { useNavigate } from "react-router-dom";
import {
  TicketIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon, // Icon Hamburger
  XMarkIcon, // Icon Close
} from "@heroicons/react/24/outline";
const MobileMenu = ({
  isOpen,
  onClose,
  onSearch,
  onLogout,
  isLoggedIn,
  searchText,
  setSearchText,
}) => {
  const navigate = useNavigate();

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearch();
    }
  };

  const handleLinkClick = (path) => {
    onClose();
    navigate(path);
  };

  const handleLogoutClick = () => {
    onClose();
    onLogout();
  };

  return (
    <div
      className={`fixed inset-0 z-40 bg-primary text-white transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose} className=" cursor-pointer">
          <XMarkIcon className="h-8 w-8 text-white" />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-6 p-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Bạn tìm gì hôm nay?"
            className="w-full rounded-md bg-white py-2 pl-4 pr-10 text-gray-700 outline-none  focus:ring-1 focus:ring-gray-800 "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // Truyền thẳng hàm setter
            onKeyDown={handleSearchKeyDown}
          />
          <MagnifyingGlassIcon
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={onSearch}
          />
        </div>

        <button
          onClick={() => handleLinkClick("/create-event")}
          className="text-lg font-semibold cursor-pointer"
        >
          Tạo sự kiện
        </button>
        <button
          onClick={() => handleLinkClick("/my-tickets")}
          className="text-lg font-semibold cursor-pointer"
        >
          Vé đã mua
        </button>

        <div className="w-full border-t border-gray-400 pt-6"></div>

        {isLoggedIn ? (
          <>
            <button
              onClick={() => handleLinkClick("/my-account")}
              className="text-lg font-semibold cursor-pointer"
            >
              Tài khoản của tôi
            </button>
            <button
              onClick={handleLogoutClick}
              className="text-lg font-semibold cursor-pointer"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <button
            onClick={() => handleLinkClick("/login")}
            className="rounded-full bg-white px-8 py-2 text-primary font-bold"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};
export default MobileMenu;
