import React from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { API_IMAGE } from "../../../constants";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerCarousel = ({ events }) => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/ticket-details/${id}`);
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="mt-5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} //
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        className="my-swiper-container"
      >
        {events.map((event) => (
          <SwiperSlide key={event?._id}>
            <div className="group relative   bs:h-56 sm:h-80  md:h-64  lg:h-80 w-full rounded-2xl overflow-hidden cursor-pointer">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={`${API_IMAGE}/${event?.cover_image_url}`}
                alt={event?.event_name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-5  text-white w-full">
                <div className="items-center mb-3 space-x-2    sm:space-x-4 hidden bs:inline-flex bg-black/30 backdrop-blur-sm p-2 rounded-lg ">
                  <p className="text-primary font-bold text-sm bs:text-lg">
                    Từ {event?.lowest_price?.toLocaleString()} đ
                  </p>
                  <div className="border-l border-gray-400 h-5"></div>
                  <p className="font-semibold">
                    {new Date(event?.start_date).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  className="w-full text-center bg-primary text-white font-bold py-2 cursor-pointer rounded-lg transition-all duration-300 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                  onClick={() => handleViewDetails(event?._id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
