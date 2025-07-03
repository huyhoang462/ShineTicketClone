import { useParams } from "react-router-dom";
import { eventService } from "../../services";
import BigTicket from "./partials/BigTicket";
import { useQuery } from "@tanstack/react-query";
import TicketInfo from "./partials/TicketInfo";
import EventInfo from "./partials/EventInfo";
const TicketDetails = () => {
  const { id } = useParams();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["eventDetail", id],
    queryFn: () => eventService.getEventById(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center bg-bg-main h-screen mt-[-64px]">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  if (isError) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Đã có lỗi xảy ra!
        </h1>
        <p className="text-gray-400">
          {error.message || "Vui lòng thử lại sau."}
        </p>
      </div>
    );
  }

  if (!event) return <div>Lỗi khi lấy dữ liệu</div>;
  return (
    <div className="bg-bg-main min-h-screen">
      <div className="mx-auto max-w-7xl p-4 ">
        <BigTicket event={event} />
        <EventInfo event={event} />
        <TicketInfo event={event} />
        {/* <div>
        </div> */}
      </div>
    </div>
  );
};

export default TicketDetails;
