import axios from "axios";
import { API_URL } from "../constants";
export const getBanner = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list_banner`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching events by user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSpecial = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list_special`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching events by user:",
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
    console.error(
      "Error fetching events by user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
