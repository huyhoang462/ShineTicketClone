// src/pages/admin/partials/EventList.jsx
import RowEvent from "./RowEvent";
import CardEvent from "./CardEvent"; // 1. Import component card mới (sẽ tạo ở dưới)

const EventList = ({ events, onViewDetails }) => {
  return (
    <div className="mt-4">
      {/* 2. Giao diện Card cho Mobile (< 1024px) */}
      <div className="lg:hidden space-y-4">
        {events.map((event) => (
          <CardEvent
            key={event._id}
            event={event}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* 3. Giao diện Bảng cho Desktop (>= 1024px) */}
      <div className="bg-gray-900 shadow-md rounded-lg hidden lg:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Tên sự kiện
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Bắt đầu
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Kết thúc
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <RowEvent
                key={event._id}
                event={event}
                onViewDetails={onViewDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;
