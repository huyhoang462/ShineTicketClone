import axios from "axios";
import { API_URL } from "../constants";

export const getAllOrders = async (eventId) => {
  try {
    const response = await axios.get(
      `${API_URL}/order/list-orders?eventId=${eventId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching orders",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};

export const createOrder = async (orderForm) => {
  try {
    const response = await axios.post(
      `${API_URL}/order/create-order`,
      orderForm
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/order/delete-order/?id=${orderId}`
    );
    console.log("xóa thành công");
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const editOrder = async (orderId, updatedStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/order/edit-order/?id=${orderId}`,
      {
        order_status_id: updatedStatus,
      }
    );
    console.log("sửa trạng thái thành công");
    return response.data;
  } catch (error) {
    console.error("Error editing order:", error);
    throw error;
  }
};
export const getAllRefund = async () => {
  try {
    const response = await axios.get(`${API_URL}/refund/list_refund`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching events by user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getEventPay = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list`);
    console.log("dataa: ", response.data.data);
    return response.data.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};

export const createRefund = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/refund/create_refund`, {
      event_id: data.event_id,
      organizer_id: data.organizer_id,
      total_amount: data.total_amount,
      refund_amount: data.refund_amount,
      commission: data.commission,
      refund_date: data.refund_date,
    });
    return response.data.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
