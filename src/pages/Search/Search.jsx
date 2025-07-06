import React, { useState, useMemo } from "react";
import SearchFilter from "./partials/SearchFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { eventService } from "../../services";
import { API_IMAGE } from "../../constants";
import { FunnelIcon } from "@heroicons/react/20/solid";

const defaultFilters = {
  dateFrom: "",
  dateTo: "",
  location: "Toàn quốc",
  category: "Tất cả",
  priceRange: [0, 5000000],
};

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const categoryQuery = searchParams.get("category");

  const [appliedFilters, setAppliedFilters] = useState(() => {
    if (categoryQuery) {
      return {
        ...defaultFilters,
        category: decodeURIComponent(categoryQuery),
      };
    }
    return null;
  });

  const [isFilterVisible, setFilterVisible] = useState(false);

  const {
    data: allEvents = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allEventsData"],
    queryFn: eventService.getAllEvents,
    refetchOnWindowFocus: false,
  });

  const displayResults = useMemo(() => {
    if (!allEvents || allEvents.length === 0) return [];

    let results = allEvents.filter(
      (event) =>
        event.event_status_id?._id === "675ea25872e40e87eb7dbf08" ||
        event.event_status_id?._id === "675ea24172e40e87eb7dbf06"
    );

    if (searchQuery) {
      results = results.filter((event) =>
        event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (appliedFilters) {
      results = results.filter((event) => {
        const eventDate = new Date(event.start_date);
        const dateFrom = appliedFilters.dateFrom
          ? new Date(appliedFilters.dateFrom)
          : null;
        const dateTo = appliedFilters.dateTo
          ? new Date(appliedFilters.dateTo)
          : null;
        if (dateTo) dateTo.setHours(23, 59, 59, 999);

        const isDateInRange =
          (!dateFrom || eventDate >= dateFrom) &&
          (!dateTo || eventDate <= dateTo);
        const isLocationMatch =
          appliedFilters.location === "Toàn quốc" ||
          event.venue_id?.city === appliedFilters.location;
        const isCategoryMatch =
          appliedFilters.category === "Tất cả" ||
          event.event_type_id?.type_name === appliedFilters.category;
        const isPriceInRange =
          (event.lowest_price ?? 0) >= appliedFilters.priceRange[0] &&
          (event.lowest_price ?? 0) <= appliedFilters.priceRange[1];

        return (
          isDateInRange && isLocationMatch && isCategoryMatch && isPriceInRange
        );
      });
    }

    return results;
  }, [allEvents, searchQuery, appliedFilters]);

  const handleApplyFilters = (newFilters) => {
    setAppliedFilters(newFilters);
    setFilterVisible(false);
  };

  const handleResetFilters = () => {
    setAppliedFilters(null);
    setFilterVisible(false);
  };

  const handleViewDetail = (id) => {
    navigate(`/ticket-details/${id}`);
  };

  return (
    <div className="bg-bg-main">
      <div className="relative text-white min-h-screen mx-auto max-w-7xl p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Kết quả tìm kiếm
            </h1>
            {searchQuery && (
              <p className="text-gray-400 mt-1">
                Cho từ khóa:{" "}
                <span className="text-primary font-semibold">
                  "{searchQuery}"
                </span>
              </p>
            )}
          </div>
          <div className="relative w-full sm:w-auto">
            <button
              className="bg-primary w-full sm:w-32 cursor-pointer flex items-center justify-center gap-x-2 text-black px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors"
              onClick={() => setFilterVisible(!isFilterVisible)}
            >
              <FunnelIcon className="h-5" />
              Bộ lọc
            </button>
            {isFilterVisible && (
              <SearchFilter
                initialFilters={appliedFilters || defaultFilters}
                onApply={handleApplyFilters}
                onReset={handleResetFilters}
                onClose={() => setFilterVisible(false)}
              />
            )}
          </div>
        </div>

        {appliedFilters && (
          <div className="bg-gray-800 p-2 rounded-lg mb-4 text-sm text-gray-300 flex items-center justify-between">
            <span>Đang áp dụng bộ lọc.</span>
            <button
              onClick={handleResetFilters}
              className="text-primary hover:underline font-semibold"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-t-4 border-gray-600 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        {isError && (
          <div className="text-center py-20">
            <p className="text-red-500">Lỗi khi tải dữ liệu: {error.message}</p>
          </div>
        )}
        {!isLoading && !isError && displayResults.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Không tìm thấy sự kiện nào phù hợp.</p>
          </div>
        )}

        {!isLoading && !isError && displayResults.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {displayResults.map((result) => (
              <div
                className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                key={result._id}
                onClick={() => handleViewDetail(result._id)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={`${API_IMAGE}/${
                      result.cover_image_url || result.logo_url
                    }`}
                    alt={result.event_name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2
                    className="text-white font-bold uppercase truncate"
                    title={result.event_name}
                  >
                    {result.event_name}
                  </h2>
                  <div className="text-primary font-semibold">
                    Từ: {result?.ticketPrice?.toLocaleString()}đ
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    {new Date(result.start_date).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
