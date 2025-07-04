import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    date_of_birth: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await authService.handleSignUp(formData);
      if (response.data.errCode === 0) {
        setSuccess(response.data.message);
        nav("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className=" w-11/12 sm:w-full bg-bg-main text-white rounded-lg  shadow md:mt-0 sm:max-w-lg xl:p-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
        <XMarkIcon className="absolute h-6 top-4 right-4 hover:text-primary cursor-pointer" />
        <div className="text-center">
          <img
            src="./shineticket.png"
            className="h-20 mx-auto"
            alt="ShineTicket Logo"
          />
        </div>
        <h1 className="text-xl font-bold leading-tight text-white0">
          Tạo tài khoản{" "}
          <span className="text-primary text-2xl">ShineTicket</span>
        </h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="md:col-span-2">
            <input
              type="text"
              name="username"
              id="full-name"
              className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:outline-primary block w-full p-2.5"
              placeholder="Nhập họ tên của bạn"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:outline-primary block w-full p-2.5"
              placeholder="Nhập email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="bg-gray-50 text-black rounded-lg focus:outline-primary block w-full p-2.5"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              className="bg-gray-50 text-black rounded-lg focus:outline-primary block w-full p-2.5"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phone_number"
              id="phone-number"
              placeholder="Nhập số điện thoại"
              className="bg-gray-50 text-black rounded-lg focus:outline-primary block w-full p-2.5"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="date"
              name="date_of_birth"
              id="date-of-birth"
              className="bg-gray-50 text-black rounded-lg focus:outline-primary block w-full p-2.5"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-between">
            <p className="text-sm font-light text-gray-200">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
