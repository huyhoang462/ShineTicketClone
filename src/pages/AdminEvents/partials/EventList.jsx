import RowEvent from "./EventRow";

const EventList = ({ events, onViewDetails }) => {
  return (
    <div className="bg-gray-900 shadow-md rounded-lg mt-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2  text-gray-300 text-left">Tên sự kiện</th>
            <th className="px-4 py-2  text-gray-300 text-left">Bắt đầu</th>
            <th className="px-4 py-2  text-gray-300 text-left">Kết thúc</th>
            <th className="px-4 py-2  text-gray-300 text-left">Trạng thái</th>
            <th className="px-4 py-2  text-gray-300 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <RowEvent event={event} onViewDetails={onViewDetails} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
