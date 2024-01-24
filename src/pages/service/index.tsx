import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Service } from "@/components/ui/service";
import { cn } from "@/lib/utils";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import LoaderComp from "@/components/loader.comp.tsx";
import { fetchServices } from "@/redux/actions/service";
import { fetchCategories } from "@/redux/actions/category";

const Services = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchCategories());
  }, [dispatch]);

  const { services, isLoading } = useTypedSelector((state) => state.service);
  const { categories } = useTypedSelector((state) => state.category);
  const [category, setCategory] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    if (category === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((s) => s.category === category);
      setFilteredServices(filtered);
    }
  }, [category, services]);

  return (
    <Container className="padding">
      <div className="h-full min-h-screen py-8">
        <h2 className="text-3xl font-bold font-RobotoMono py-6">Categories</h2>
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
          <ul className="border-r border-r-slate-400 w-30 md:w-60 flex flex-col h-fit md:min-h-screen overflow-y-scroll scrollbar-hide">
            {categories.map((item, i) => {
              return (
                <Button
                  className={cn(
                    "py-2 pl-3 rounded-l-md font-Poppins text-[14px] font-semibold flex items-center justify-start w-full",
                    item.categoryName && category === item.categoryName
                      ? "bg-muted border-r-[3px] border-r-black font-bold "
                      : ""
                  )}
                  key={i}
                  variant={"ghost"}
                  onClick={() => {
                    if (category === item.categoryName) {
                      setCategory("");
                    } else {
                      setCategory(item.categoryName);
                    }
                  }}
                >
                  {item.categoryName}
                </Button>
              );
            })}
          </ul>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 h-full px-4 md:px-20">
            {isLoading ? (
              <LoaderComp />
            ) : filteredServices.length ? (
              filteredServices.map((item, i) => {
                return <Service key={i} {...item} />;
              })
            ) : (
              <div className="flex items-center space-x-3 justify-center w-full">
                <Info />
                <h2>No Data Found With This Category</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Services;
