// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPromptModal from "./LoginPromptModal"; // Giả sử component này đã tồn tại

const PrivateRoute = ({ children, allowedRoles }) => {
  // 1. Kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách kiểm tra user_id
  const isLoggedIn = !!localStorage.getItem("user_id");

  // 2. Lấy vai trò (role) từ localStorage
  // Dùng `parseInt` để chuyển chuỗi "0" hoặc "1" thành số 0 hoặc 1.
  // Nếu không có role, nó sẽ là NaN, phép so sánh sau sẽ luôn sai.
  const userRole = parseInt(localStorage.getItem("role"), 10);

  // KỊCH BẢN 1: CHƯA ĐĂNG NHẬP
  // Nếu không có user_id trong localStorage, hiển thị modal yêu cầu đăng nhập.
  if (!isLoggedIn) {
    return <LoginPromptModal />;
  }

  // KỊCH BẢN 2: ĐÃ ĐĂNG NHẬP NHƯNG KHÔNG ĐÚNG VAI TRÒ
  // `allowedRoles` là một mảng được truyền vào, ví dụ: [0] cho user, [1] cho admin.
  // Kiểm tra xem vai trò của người dùng có nằm trong danh sách các vai trò được phép không.
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Nếu không có quyền, hiển thị thông báo và điều hướng về trang chủ.
    toast.warn("Bạn không có quyền truy cập trang này.");
    return <Navigate to="/" replace />;
  }

  // KỊCH BẢN 3: ĐĂNG NHẬP THÀNH CÔNG VÀ ĐÚNG VAI TRÒ
  // Cho phép render component con (trang được bảo vệ).
  return children;
};

export default PrivateRoute;
