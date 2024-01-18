import Container from "@/components/ui/container";
import { useSettingContext } from "@/context/Setting";
import { useTypedSelector } from "@/redux";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Input } from "./ui/input";

import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
const Hero = () => {
  const { screenSize } = useSettingContext();

  const { brands, isLoading } = useTypedSelector((state) => state.brand);
  const { services } = useTypedSelector((state) => state.service);

  const [filteredServices, setFilteredServices] = useState<IService[]>([]);
  const [searchState, setSearchState] = useState<string>("");

  useEffect(() => {
    if (!searchState) {
      setFilteredServices([]);
      return;
    }

    const filtered = filterServices(services, searchState);
    setFilteredServices(filtered);
  }, [searchState, services]);

  const filterServices = (services: IService[], searchTerm: string) => {
    return services
      .filter((s) => {
        return s.name.includes(searchTerm) || s.title.includes(searchTerm);
      })
      .slice(0, 2);
  };

  return (
    <section>
      <div className="hero_bg h-[70vh] ">
        <Container className="flex flex-col h-full space-y-8 justify-center text-center z-10">
          <h1 className="text-large text-white text-center">
            সার্ভিস ওয়ার্ল্ড বিডি
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white text-center">
            এখন আপনার ব্যক্তিগত সহকারী
          </p>
          <form className="max-w-3xl mx-auto w-full flex flex-col md:flex-row  space-x-0 md:space-x-3 space-y-3 md:space-y-0 relative">
            <div className="w-full relative space-y-3 md:space-y-0">
              <Input
                value={searchState}
                placeholder="আপনার সেবাটি খুঁজুন"
                className="w-full h-14"
                name="service"
                onChange={(e) => {
                  setSearchState(e.target.value);
                }}
              />
              <button className="static md:absolute flex items-center justify-center top-[15%] right-5 bg-primary z-50 space-x-3 px-6 py-3 rounded-lg">
                {screenSize < 768 ? (
                  <span className="font-semibold font-Poppins">Search</span>
                ) : (
                  ""
                )}
                <SearchIcon size={17} strokeWidth={3} />
              </button>
            </div>

            {filteredServices.length > 0 ? (
              <div className="absolute w-full top-full mt-10 -left-3 space-y-4">
                {filteredServices.map((item) => (
                  <Link
                    className="my-4"
                    to={`/services/${item.id}`}
                    key={item.id}
                  >
                    <div className="flex w-full justify-center bg-white rounded-xl shadow-2xl">
                      <div className="px-8 py-4">
                        <img
                          className="object-cover w-24 h-24"
                          src={item.thumbnail}
                        />
                      </div>
                      <div className="px-8 py-4 text-left">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                          {item.name}
                        </h2>
                        <h3 className="text-lg text-slate-600">{item.title}</h3>
                        <h4 className="text-xl font-semibold">{item.price}৳</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </form>
        </Container>
      </div>

      {/**
       * Brands
       */}
      <div className="bg-primary md:mt-0 h-56 flex items-center">
        <div className="w-2/4 padding-left">
          <p className="font-RobotoMono">পেমেন্ট</p>
          <h3 className="text-medium font-Lato">আমাদের পেমেন্ট সিস্টেম</h3>
        </div>
        <div className="w-2/4 bg-white h-full flex items-center pr-6 sm:pr-10 lg:pr-24 xl:pr-32 2xl:rx-60 md:pr-16">
          <Swiper
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
            slidesPerView={4}
            modules={[Autoplay]}
          >
            {isLoading ? (
              <div className="text-center">...Loading</div>
            ) : (
              brands.map((brand, i) => {
                return (
                  <SwiperSlide
                    key={i}
                    className="flex justify-center items-center"
                  >
                    <div className="w-[150px] group h-[150px] overflow-hidden rounded-full relative">
                      <img
                        className="w-full h-full object-contain -z-10 relative bg-slate-100"
                        src={brand.image}
                      />
                      <p className="absolute opacity-0 group-hover:opacity-100 duration-300 w-full h-full flex items-center justify-center bg-slate-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-center">
                        {brand?.number || "Number"}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
