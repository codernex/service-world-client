import {cn} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import React from "react";
import {Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import {ServiceSlide} from "./ui/service";

export const SlideComponent = React.memo<{
  title: string;
  showBtn?: boolean;
  url?: string;
  services: IService[];
}>(({ title, showBtn = true, services }) => {
  return (
    <div className="my-14">
      <div className="my-5 flex justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <a
          href={'/services'}
          className={cn(
            showBtn ? "opacity-100 visible" : "opacity-0 hidden",
            "flex space-x-2"
          )}
        >
          <span>সমস্ত পরিষেবাগুলি</span> <ChevronRight />
        </a>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        breakpoints={{
          275: {
            slidesPerView: 1,
          },
          475: {
            slidesPerView: 2,
          },
          760: {
            slidesPerView: 2,
          },
          1080: {
            slidesPerView: 3,
          },
          1366: {
            slidesPerView: 4,
          },
        }}
        navigation={true}
        className="mt-10"
      >
        {services.map((service) => (
          <SwiperSlide
            className="flex items-center justify-center"
            key={service.id}
          >
            <ServiceSlide key={service.id} {...service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});
