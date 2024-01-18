import About from "@/components/about";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Form from "@/components/form";
import WhyUs from "@/components/wy-us";
import CountUp from "@/components/countup";
import Team from "@/components/team";
import Process from "@/components/process";
import Contact from "@/components/contact";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux";
import { fetchServices } from "@/redux/actions/service";
import { fetchBrands } from "@/redux/actions/brand";
import { fetchTeams } from "@/redux/actions/team";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBrands());
    dispatch(fetchTeams());
  }, [dispatch]);
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Form />
      <WhyUs />
      <CountUp />
      <Team />
      <Process />
      <Contact />
    </>
  );
};

export default Home;
