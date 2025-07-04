// src/pages/MyAccount.jsx
import React, { useState, useEffect } from "react";
// 1. Import các hook cần thiết
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../services"; // Đảm bảo đường dẫn đúng

export default function MyAccount() {
  const [formData, setFormData] = useState({
    _id: "",
    username: "",
    phone_number: "",
    email: "",
    date_of_birth: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient(); // Dùng để làm mới dữ liệu sau khi cập nhật

  // --- 2. DÙNG useQuery ĐỂ LẤY DỮ LIỆU NGƯỜI DÙNG ---
  const userId = localStorage.getItem("user_id");

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", userId], // Key duy nhất cho user này
    queryFn: () => userService.getUserById(userId),
    enabled: !!userId, // Chỉ chạy khi có userId
    staleTime: 1000 * 60 * 5, // Dữ liệu user được coi là mới trong 5 phút
  });

  // --- 3. Dùng useEffect để cập nhật form khi useQuery có dữ liệu ---
  useEffect(() => {
    if (user) {
      // Hàm này vẫn cần thiết để định dạng ngày
      const formatDateForInput = (mongoDate) => {
        if (!mongoDate) return "";
        return new Date(mongoDate).toISOString().split("T")[0];
      };

      setFormData({
        _id: user._id || "",
        username: user.username || "",
        phone_number: user.phone_number || "",
        email: user.email || "",
        date_of_birth: formatDateForInput(user.date_of_birth) || "",
      });
    }
  }, [user]); // Chạy lại mỗi khi object `user` từ useQuery thay đổi

  // --- 4. DÙNG useMutation ĐỂ XỬ LÝ VIỆC CẬP NHẬT ---
  const updateUserMutation = useMutation({
    mutationFn: userService.updateUser, // Gán hàm API vừa tạo
    onSuccess: (data) => {
      // Khi cập nhật thành công
      if (data.message.errCode === 0) {
        alert("Thông tin đã được lưu!");
        // Cập nhật localStorage
        localStorage.setItem("user", JSON.stringify(formData));
        // Làm mới query 'user' để UI hiển thị dữ liệu mới nhất từ server
        queryClient.invalidateQueries({ queryKey: ["user", userId] });
        setIsEditing(false);
      } else {
        alert(data.message.message || "Lỗi khi lưu thông tin");
      }
    },
    onError: (err) => {
      // Khi API ném ra lỗi
      alert(`Có lỗi xảy ra: ${err.response?.data?.message || err.message}`);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Gọi mutation để cập nhật
      updateUserMutation.mutate(formData);
    } else {
      setIsEditing(true);
    }
  };

  // --- Xử lý các trạng thái UI ---
  if (isLoading) {
    return (
      <div className="flex-1 h-screen bg-black flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-t-4 border-gray-600 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 h-screen bg-black flex justify-center items-center text-red-500">
        Lỗi khi tải thông tin tài khoản: {error.message}
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black">
      {" "}
      {/* Bỏ h-screen và mx-auto */}
      <div className="flex items-center justify-center text-2xl lg:pl-4 h-16 bg-bg-main border-b-2 border-[#A19393] font-semibold text-white mb-4">
        Tài khoản
      </div>
      <div className="bg-bg-main text-white rounded-lg p-6 mx-4 md:mx-6">
        {" "}
        {/* Thêm padding responsive */}
        <h2 className="text-xl font-semibold mb-2">Thông tin tài khoản</h2>
        <p className="text-sm text-gray-400 mb-6">
          Cung cấp thông tin chính xác để hỗ trợ mua vé hoặc xác thực vé.
        </p>
        {/* Dùng thẻ form để có ngữ nghĩa tốt hơn */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Tên người dùng"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full text-black border bg-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full text-black border bg-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="w-full  border bg-gray-200 text-gray-500 border-gray-300 rounded-lg px-3 py-2 focus:outline-none cursor-not-allowed"
          />
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full text-black border bg-white border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:bg-gray-200 disabled:text-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-primary cursor-pointer hover:scale-105 text-white font-bold py-2.5 rounded-lg transition-transform"
            disabled={updateUserMutation.isPending}
          >
            {updateUserMutation.isPending
              ? "Đang lưu..."
              : isEditing
              ? "Lưu"
              : "Sửa"}
          </button>
        </form>
      </div>
    </div>
  );
}
