import axios from "axios";
import { API_URL } from "../constants";
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/get/${userId}`);
    return response.data.user.user;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng: ", error);
  }
};
export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/edit`, userData);
    console.log(" sửa: ", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi cập nhật thông tin người dùng:",
      error.response?.data || error.message
    );
    throw error;
  }
};
