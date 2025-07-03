// src/pages/Home.js
import { eventService } from "../../services";
import { useQuery } from "@tanstack/react-query";
import BannerCarousel from "./partials/BannerCarousel";
import EventSection from "./partials/EventSection";
import Navbar from "./partials/Navbar";
const Home = () => {
  const {
    data: banner,
    isLoading: isBannerLoading,
    isError: isBannerError,
    error: bannerError,
  } = useQuery({
    queryKey: ["events", "banner"],
    queryFn: eventService.getBanner,
  });

  const {
    data: trend,
    isLoading: isTrendLoading,
    isError: isTrendError,
    error: trendError,
  } = useQuery({
    queryKey: ["events", "trend"],
    queryFn: eventService.getTrend,
  });

  const {
    data: special,
    isLoading: isSpecialLoading,
    isError: isSpecialError,
    error: specialError,
  } = useQuery({
    queryKey: ["events", "special"],
    queryFn: eventService.getSpecial,
  });

  const isLoading = isBannerLoading || isSpecialLoading || isTrendLoading;
  const isError = isBannerError || isSpecialError || isTrendError;
  const error = bannerError || specialError || trendError;

  if (isLoading)
    return (
      <div className="flex justify-center items-center bg-bg-main h-screen mt-[-64px]">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );

  if (isError) return <p>Error: {error}</p>;
  return (
    <div className="bg-bg-main ">
      <Navbar />
      <div className="mx-auto max-w-7xl p-4">
        <BannerCarousel events={banner || []} />
        <EventSection title="Sự kiện đặc biệt" events={special || []} />
        <EventSection title="Sự kiện xu hướng" events={trend || []} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
