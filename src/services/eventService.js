import axios from "axios";
import { API_URL } from "../constants";
export const getBanner = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list_banner`);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy banner:", error.response?.data || error.message);
    throw error;
  }
};

export const getSpecial = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list_special`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy special:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getTrend = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list_trend`);
    return response.data.data;
  } catch (error) {
    console.error("Lỗi khi lấy trend:", error.response?.data || error.message);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/event/get?id=${id}`);
    console.log("event lấy về: ", response.data.event);

    return response.data.event;
  } catch (error) {
    console.error("Lỗi khi lấy event theo id:", error);
    throw error;
  }
};
