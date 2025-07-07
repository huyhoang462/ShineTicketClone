// src/pages/admin/partials/RowEvent.jsx
import { EyeIcon } from "@heroicons/react/24/outline";

export default function RowEvent({ event, onViewDetails }) {
  const statusColorMap = {
    "676ece5d50c4e95732edbadd": "text-yellow-500", // Chờ duyệt
    "675ea25872e40e87eb7dbf08": "text-blue-500", // Sắp diễn ra
    "675ea24172e40e87eb7dbf06": "text-green-500", // Đang diễn ra
    "675ea26172e40e87eb7dbf0a": "text-red-500", // Đã kết thúc
    "676ece8250c4e95732edbadf": "text-gray-500", // Đã hủy
  };
  const statusTextMap = {
    "676ece5d50c4e95732edbadd": "Chờ duyệt",
    "675ea25872e40e87eb7dbf08": "Sắp diễn ra",
    "675ea24172e40e87eb7dbf06": "Đang diễn ra",
    "675ea26172e40e87eb7dbf0a": "Đã kết thúc",
    "676ece8250c4e95732edbadf": "Đã hủy",
  };

  // Thêm key vào thẻ tr để React nhận diện
  return (
    <tr key={event._id} className="hover:bg-gray-800 text-gray-200 text-sm">
      <td className="px-4 py-3">{event?.event_name}</td>
      <td className="px-4 py-3">
        {new Date(event?.start_date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className="px-4 py-3">
        {new Date(event?.end_date).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td
        className={`px-4 py-3 font-semibold ${
          statusColorMap[event?.event_status_id?._id] || "text-gray-500"
        }`}
      >
        {statusTextMap[event?.event_status_id?._id] || "Không xác định"}
      </td>
      <td className="px-4 py-3 text-center">
        <button
          className="text-gray-400 hover:text-primary transition-colors"
          onClick={() => onViewDetails(event)}
        >
          <EyeIcon className="h-6 w-6" />
        </button>
      </td>
    </tr>
  );
}
