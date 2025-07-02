import axios from "axios";
import { API_URL } from "../constants";
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/get/?id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng: ", error);
  }
};
