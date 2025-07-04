import axios from "axios";
import { API_URL } from "../constants";

export const handleLogin = async (email, password) => {
  console.log("em:", email, " pss: ", password);
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const handleSignUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw error;
  }
};
