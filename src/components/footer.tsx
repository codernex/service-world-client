import Logo from "@/assets/logo.png";
import {
  ChevronRight,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "lucide-react";
import Container from "@/components/ui/container";
import { Link } from "react-router-dom";
const workingHours = [
  {
    day: "Saturday - Thursday",
    time: "09:00 AM - 06:00 PM",
  },
  {
    day: "Friday",
    time: "Closed",
  },
];
export default function Footer() {
  return (
    <footer className="relative bg-[#161921]  w-full h-full">
      <Container className="py-20 pb-0 grid grid-cols-1 gap-10 lg:gap-20 lg:grid-cols-2 xl:grid-cols-4 bg-transparent">
        <div>
          <h2 className="text-slate-50 text-xl font-semibold py-3 border-b border-primary">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-slate-200 mt-4">
            আমাদের পরিষেবাটি এমনভাবে পরিচালিত হয় যেখান থেকে আপনি ঘরে বসে আপনার
            কাঙ্খিত সেবাটি পেয়ে যাবেন। ছোটখাটো কাজ থেকে যেকোনো ধরনের ভারী কাজে
            আমাদের দক্ষ কর্মী ও জনবল দ্বারা আমরা আপনার সমস্যাটিকে সমাধান করে
            থাকি।
          </p>
        </div>
        <div>
          <img className="w-40 bg-slate-400" src={Logo} />
          <h2 className="text-slate-50 text-xl font-semibold py-3">
            কাজের সময় :
          </h2>
          <ul className="">
            {workingHours.map((item, i) => {
              return (
                <li
                  key={i}
                  className="text-slate-200 font-Lato flex justify-between text-sm border-b border-dashed border-slate-500 last:border-0 py-5"
                >
                  <span>{item.day}</span> <span>{item.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="text-slate-50 text-xl font-semibold py-3 border-b border-primary">
            কুইক লিংকস্
          </h2>
          <ul className="space-y-3 my-4">
            <a href={"/"} className="flex text-slate-50">
              <ChevronRight />
              <span>হোম</span>
            </a>
            <a href={"/services"} className="flex text-slate-50">
              <ChevronRight />
              <span>সার্ভিস</span>
            </a>
            <a href={"/contact"} className="flex text-slate-50">
              <ChevronRight />
              <span>যোগাযোগ</span>
            </a>
            <a href={"/About"} className="flex text-slate-50">
              <ChevronRight />
              <span>আমাদের সম্পর্কে</span>
            </a>
          </ul>
        </div>
        <div>
          <h2 className="text-slate-50 text-xl font-semibold py-3 border-b border-primary">
            সোশ্যাল লিংকস
          </h2>
          <ul className="my-4 flex items-center space-x-4">
            <Link
              target={"_blank"}
              to={"https://www.facebook.com/ServiceWorldBDs"}
              className="flex text-slate-50"
            >
              <FacebookIcon size={26} />
            </Link>
            <Link to={"#"} className="flex text-slate-50">
              <InstagramIcon size={26} />
            </Link>
            <Link to={"#"} className="flex text-red-400">
              <YoutubeIcon size={26} />
            </Link>
            <Link to={"#"} className="flex text-slate-50">
              <XIcon size={26} />
            </Link>
          </ul>
        </div>
      </Container>
      <div className="flex justify-center bg-[#2A2F3C]">
        <p className="text-white py-10 text-center">
          Copyright &copy; 2023 Service World BD. All Rights Reserved by{" "}
          <Link
            to={"/"}
            className="hover:underline focus:underline text-primary"
          >
            Service World
          </Link>
        </p>
      </div>
    </footer>
  );
}
