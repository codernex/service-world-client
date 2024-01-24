import Container from "@/components/ui/container";
import { MapPinIcon, PhoneCall } from "lucide-react";

export default function Contact() {
  return (
    <Container className="bg-contact-bg-2 py-10 lg:py-32 space-y-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-primary flex font-semibold font-Lato text-3xl items-center space-x-3 justify-center">
          <PhoneCall size={24} />
          <a href={"tel:+8801781887671"}>+880-1781-887 671</a>
        </p>
        <p className="flex justify-center text-primary text-lg font-semibold items-center">
          <MapPinIcon />{" "}
          <span>নতুন খয়েরতলা (তেঁতুলতলা মোড়), পালবাড়ী, যশোর</span>
        </p>
        <h2 className="text-white text-medium text-center ">
          এখন আপনি যদি আপনার হাতের কাছেই একজন দক্ষ কর্মী পেতে চান তাহলে আমাদের
          সাথে যোগাযোগ করুন
        </h2>
      </div>
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row items-center justify-center lg:space-x-6">
        <a
          className="h-14 w-40 flex items-center bg-primary justify-center rounded-md"
          href="/services"
        >
          অনলাইনে বুকিং করুন
        </a>
        <a
          href="/contact"
          className="h-14 w-40 flex items-center bg-slate-50 justify-center rounded-md"
        >
          যোগাযোগ করুন
        </a>
      </div>
    </Container>
  );
}
