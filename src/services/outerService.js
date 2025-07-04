import axios from "axios";

export const getBanks = async () => {
  try {
    const response = await axios.get("https://api.vietqr.io/v2/banks");

    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ngân hàng:", error);

    throw error;
  }
};
