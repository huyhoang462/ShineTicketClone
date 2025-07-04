import axios from "axios";
import { API_URL } from "../constants";
export const getMyTickets = async (_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/order-detail/list-order-details?UserId=${_id}`
    );
    console.log("vé: ", response.data.data);

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching events by user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
