import { useTypedSelector } from "@/redux";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import LoaderComp from "./loader.comp";
import ToolIcon from "./tool-icon";
import Container from "./ui/container";
export default function Team() {
  const { teams, isLoading } = useTypedSelector((state) => state.team);
  return (
    <Container className="py-10 lg:py-32 team-bg  ">
      <div className="space-y-4">
        <p className="flex font-semibold font-RobotoMono justify-center items-center text-primary">
          <ToolIcon />
            আমাদের টিম মেম্বার
        </p>
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center">
            আমাদের দক্ষ্য টিম মেম্বার
        </h1>
      </div>
      <Swiper
        modules={[Autoplay, Navigation]}
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
        autoplay
        navigation
        hashNavigation
        className="mt-10"
      >
        {isLoading ? (
          <LoaderComp />
        ) : (
          teams.map((team, i) => {
            return (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <div className="w-[282px] h-[350px]">
                  <div className="">
                    <img
                      className="w-full object-cover h-[290px] bg-gray-700 -z-10 relative "
                      src={team.image}
                    />
                  </div>
                  <div className="bg-white mx-4 text-center -mt-8 z-10 py-2">
                    <h2 className="text-xl font-semibold text-slate-950">
                      {team.name}
                    </h2>
                    <p className="text-primary font-medium">{team.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </Container>
  );
}
