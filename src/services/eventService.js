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
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/list`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const getEventsByUser = async (_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/event/get_by_user?userId=${_id}`
    );
    console.log("dataa: ", response.data.events);
    return response.data.events;
  } catch (error) {
    console.error(
      "Error fetching events by user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getEventType = async () => {
  try {
    const response = await axios.get(`${API_URL}/eventtypes/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event types:", error);
    throw error;
  }
};

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  if (arr.length < 2) return null;

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) return null;
  const mime = mimeMatch[1];

  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const postEvent = async (eventData) => {
  try {
    console.log("Dữ liệu đầu vào cho postEvent: ", eventData);
    const formData = new FormData();

    Object.keys(eventData).forEach((key) => {
      const value = eventData[key];

      if (key === "logo_url" || key === "cover_image_url") {
        if (
          value &&
          typeof value === "string" &&
          value.startsWith("data:image")
        ) {
          const filename = `${key}_${Date.now()}.jpg`;

          const file = dataURLtoFile(value, filename);
          if (file) {
            formData.append(key, file);
          }
        } else if (value) {
          formData.append(key, value);
        }
      } else if (key === "tickets") {
        formData.append("tickets", JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    const response = await axios.post(`${API_URL}/event/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creating event:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const setWillOccureEvent = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/event/edit`, {
      id: id,
      event_status_id: "675ea25872e40e87eb7dbf08",
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Error set occuring events:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
export const setOccuringEvent = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/event/edit`, {
      id: id,
      event_status_id: "675ea24172e40e87eb7dbf06",
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Error set occuring events:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
export const setOccuredEvent = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/event/edit`, {
      id: id,
      event_status_id: "675ea26172e40e87eb7dbf0a",
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Error set occuring events:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
export const setRejectEvent = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/event/edit`, {
      id: id,
      event_status_id: "676ece8250c4e95732edbadf",
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error(
      "Error set occuring events:",
      error.response?.data || error.message
    );
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};
