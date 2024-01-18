import Container from "@/components/ui/container";
import ToolIcon from "./tool-icon";
import { Button } from "./ui/button";
import { SlideComponent } from "./slidecomponent";
import { useTypedSelector } from "@/redux";
import {useNavigate} from "react-router-dom";
import LoaderComp from "@/components/loader.comp.tsx";
import {useMemo} from "react";

export default function Services() {
  const { services,isLoading } = useTypedSelector((state) => state.service);
  const navigate= useNavigate()

    const trendingServices=useMemo(()=>{

        return services.filter(s=>s.reviews.length>3)
    },[services])
  return (
    <Container className="py-10 lg:py-32 bg-slate-50">
      <div className="flex flex-col md:flex-row md:space-y-0 space-y-2 justify-between items-center">
        <div className="flex flex-col space-y-3">
          <p className="flex text-primary justify-center md:justify-start items-center font-semibold">
            <ToolIcon />
            <span className="font-RobotoMono">আমাদের সেবাসমূহ </span>
          </p>
          <h3 className="text-medium">আমাদের পেশাদার পরিষেবা দেখুন</h3>
        </div>
        <Button onClick={()=>navigate("services")} className="h-14">সমস্ত পরিষেবাগুলি</Button>
      </div>
        {
            isLoading?<LoaderComp/>:<SlideComponent
                title="For Your Home"
                showBtn={false}
                services={services}
            />
        }
        {
            isLoading?<LoaderComp/>:<SlideComponent title="Trending" url="trending" services={trendingServices} />
        }
    </Container>
  );
}
