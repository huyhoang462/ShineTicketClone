import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPromptModal = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate("/login", { state: { from: location }, replace: true });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Yêu cầu đăng nhập
        </h2>
        <p className="text-gray-600 mb-6">
          Bạn cần đăng nhập để thực hiện tính năng này.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 cursor-pointer rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Để sau
          </button>
          <button
            onClick={handleLogin}
            className="px-6 py-2 cursor-pointer rounded-lg bg-primary text-black font-semibold hover:bg-yellow-400 transition-colors"
          >
            Tới đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
