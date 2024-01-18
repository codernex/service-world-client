import Container from "@/components/ui/container";
import WhyUs1 from "@/assets/why_1_1.jpg";
import WhyUs2 from "@/assets/why_1_2.jpg";
import ToolIcon from "./tool-icon";
import PriceIcon from "./price-icon";
import ProfessionalIcons from "./profession-icon";
import WhyUs3 from "@/assets/why_1_3.png";

const WhyUs = () => {
  return (
    <Container className="flex flex-col pb-32 space-y-10 md:py-20 md:flex-col md:space-y-10 lg:space-x-8  lg:flex-row lg:py-32 md:justify-between overflow-hidden">
      <div className="w-full text-center lg:w-2/4 flex flex-col space-y-8 mt-28 md:mt-0">
        <p className="flex font-semibold font-RobotoMono justify-center items-center text-primary">
          <ToolIcon />
          কেন আমাদের পরিষেবা নির্বাচন করবেন?
        </p>
        <h3 className="text-medium">
          সমস্ত পেশাদার পরিষেবার জন্য নিখুঁত সমাধান
        </h3>
        <p className="text-p font-Lato">
          সার্ভিস ওয়ার্ল্ড বিডি আপনাকে এমন সেবা প্রদান করে যা দক্ষ কর্মী দ্বারা পরিচালিত এবং  নিপুণতার সাথে সকল কাজ সম্পাদন হয়। এছাড়াও অতি স্বল্প মূল্যে সেবাটি পেয়ে যাচ্ছেন আপনি ঘরে বসেই হাতের নাগালে।
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center bg-slate-50 py-4 px-4 space-y-3">
            <PriceIcon />
            <h3 className="text-xl font-semibold">সাশ্রয়ী মূল্যের</h3>
            <p className="text-p font-Lato">
              আমাদের প্রত্যেকের সেবা আপনি পেয়ে যাচ্ছেন অতিসম্পন্ন মূল্যে
            </p>
          </div>
          <div className="flex flex-col items-center bg-slate-50 py-4 px-4 space-y-3">
            <ProfessionalIcons />
            <h3 className="text-xl font-semibold">বিশেষজ্ঞ পেশাদার</h3>
            <p className="text-p font-Lato">
              আমাদের প্রত্যেকটি কর্মী  অভিজ্ঞ পেশাদার এবং পরিপূর্ণ সার্টিফাইড
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full flex justify-end  lg:w-2/4">
        <img
          className="object-contain absolute left-0 md:left-10 md:top-24"
          src={WhyUs3}
        />
        <img className="w-3/4 object-cover " src={WhyUs1} />
        <img
          className="absolute  object-contain -bottom-36 md:-bottom-20 left-0 border-[6px] border-slate-300 "
          src={WhyUs2}
        />
        <div className="absolute -bottom-10 md:right-10 shadow-xl bg-white text-center px-4 py-8">
          <h2 className="text-6xl font-semibold text-primary">24</h2>
          <p className="text-xl text-slate-500 font-semibold">
            Hours <br /> Emergency Services
          </p>
        </div>
      </div>
    </Container>
  );
};

export default WhyUs;
