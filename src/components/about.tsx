import Container from "@/components/ui/container";
import About1 from "@/assets/about_1_1.jpg";
import About2 from "@/assets/about_1_2.jpg";
import ToolIcon from "./tool-icon";
import {Button} from "./ui/button";
import {LucideBadgeCheck} from "lucide-react";

const About = () => {
  return (
    <Container
      id="about"
      className="flex flex-col md:flex-row py-10 mt-10  lg:py-32 md:justify-between"
    >
      <div className="relative w-full md:w-1/4 lg:w-1/4">
        <img className="w-full object-cover " src={About1} />
        <img
          className="absolute w-full max-w-[300px] top-[60%] right-0 md:top-40 md:-right-20 lg:-right-20 lg:top-[60%] border-[6px] border-slate-300 "
          src={About2}
        />

        <h2 className="text-6xl absolute -top-2 right-0 md:-right-16 lg:-right-[80px] font-bold text-primary z-10">
          03
        </h2>
        <p className="bg-slate-200 rotate-90 absolute top-28 -right-[60px] md:-right-[138px] lg:-right-[155px] font-Poppins font-bold px-3 lg:-z-10">
          পেশাদার পরিষেবা <br />{" "}
          <span className="text-slate-600 font-Poppins font-bold">
            Years Experiences
          </span>
        </p>
      </div>
      <div className="w-full md:w-2/4 lg:w-2/4 flex flex-col space-y-8 mt-40 md:mt-0">
        <p className="flex font-semibold font-RobotoMono items-center text-primary">
          <ToolIcon />
          আমাদের কোম্পানি সম্পর্কে
        </p>
        <h3 className="text-medium">
          আমাদের কোম্পানি সব সময়<br/> পেশাদার পরিষেবা প্রদান করে
        </h3>
        <p className="text-p">
          আমাদের পরিষেবাটি এমনভাবে পরিচালিত হয় যেখান থেকে আপনি ঘরে বসে আপনার কাঙ্খিত সেবাটি পেয়ে যাবেন। ছোটখাটো কাজ থেকে যেকোনো ধরনের ভারী কাজে আমাদের দক্ষ কর্মী ও জনবল দ্বারা আমরা আপনার সমস্যাটিকে সমাধান করে থাকি।
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <Button
            variant={"outline"}
            className="px-8  space-x-2 h-14 capitalize"
          >
            <LucideBadgeCheck stroke="#fbbc08" />
            <span className="font-semibold">পরিকল্পনা</span>
          </Button>
          <Button
            variant={"outline"}
            className="px-8  space-x-2 h-14 capitalize"
          >
            <LucideBadgeCheck stroke="#fbbc08" />
            <span className="font-semibold">পরিবর্তন</span>
          </Button>
          <Button
            variant={"outline"}
            className="px-8  space-x-2 h-14 capitalize"
          >
            <LucideBadgeCheck stroke="#fbbc08" />
            <span className="font-semibold">স্থাপন</span>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default About;
