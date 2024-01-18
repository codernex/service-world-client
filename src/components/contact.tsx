import Container from "@/components/ui/container";
import { MapPinIcon, PhoneCall } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export default function Contact() {
  const navigate = useNavigate();
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
        <Button
          onClick={() => {
            navigate("/services");
          }}
          className="h-14 w-40"
        >
          অনলাইনে বুকিং করুন
        </Button>
        <Link
          to="/contact"
          className="h-14 w-40 flex items-center bg-slate-50 justify-center rounded-md"
        >
          যোগাযোগ করুন
        </Link>
      </div>
    </Container>
  );
}
