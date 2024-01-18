import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useCart, userOrderNow } from "@/hooks/cart";
import { cn } from "@/lib/utils";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { submitReview } from "@/redux/actions/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, StarIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { z } from "zod";
import dateTime from "dayjs";
import OrderNow from "./components/order-now";

export default function SingleService() {
  const location = useLocation();
  const { services } = useTypedSelector((state) => state.service);
  const params = useParams();
  const path = useMemo(() => location.hash.split("#").join(""), [location]);

  const descRef = useRef<HTMLDivElement | null>(null);

  const service = useMemo(
    () => services.find((s) => s.id === params.id),
    [services, params]
  );

  const avgReview = useMemo(() => {
    if (service?.reviews) {
      return (
        service.reviews.reduce((a, b) => a + b.rating, 0) /
        service.reviews.length
      );
    } else {
      return 0;
    }
  }, [service]);

  type StarType = 5 | 4 | 3 | 2 | 1;

  const getStarCount = useCallback(
    (n: StarType) => {
      return service?.reviews.filter((r) => r.rating === n).length || 0;
    },
    [service]
  );

  const getPercentage = useCallback((n1: number, n2: number) => {
    return (n1 / n2) * 100;
  }, []);

  useEffect(() => {
    if (descRef.current && service) {
      descRef.current.innerHTML = service.description || "";
    }
  }, [service]);

  const generateStarRating = useCallback(function (
    starCount: number,
    totalLength: number
  ): string {
    const maxStars = 5;
    const maxStarValue = 5;

    if (starCount < 1 || starCount > maxStars) {
      throw new Error("Star count should be between 1 and 5");
    }

    const filledStars = Math.floor((starCount / maxStarValue) * totalLength);
    const emptyStars = totalLength - filledStars;

    const filledStarStr = "★".repeat(filledStars);
    const emptyStarStr = "☆".repeat(emptyStars);

    return filledStarStr + emptyStarStr;
  },
  []);
  return (
    <>
      <div
        style={{
          background: `linear-gradient(270deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${service?.thumbnail}), url(https://s3.ap-south-1.amazonaws.com/cdn-marketplacexyz/live/img/55541bd.png)`,
        }}
        className="h-[60vh] bg-no-repeat bg-cover bg-center"
      >
        <Container className="flex flex-col justify-center h-full relative space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white">
            {service?.name} ({service?.title})
          </h2>
          <div className="flex bg-primary w-fit items-center px-3 py-2 space-x-2 rounded-md">
            <Star />
            <span className="text-2xl font-semibold">
              {avgReview ? Math.floor(avgReview) : 0}
            </span>
            <span>out of 5</span>
          </div>
          {/* <div>
            <p className="text-white">4.9</p>
            <p className="text-white">out of 5</p>
          </div> */}
        </Container>
      </div>

      <Container className="relative h-full min-h-screen py-12">
        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
          <ul className="border-r border-r-slate-400 w-30 md:w-60 flex flex-col h-fit lg:min-h-screen overflow-y-scroll scrollbar-hide">
            <a
              className={cn(
                "py-2 pl-3 rounded-l-md font-Poppins text-[14px] font-semibold flex items-center justify-start w-full cursor-pointer",
                path === "overview"
                  ? "bg-muted border-r-[3px] border-r-primary font-bold "
                  : ""
              )}
              href="#overview"
            >
              Overview
            </a>
            <a
              className={cn(
                "py-2 pl-3 rounded-l-md font-Poppins text-[14px] font-semibold flex items-center justify-start w-full cursor-pointer",
                path === "review"
                  ? "bg-muted border-r-[3px] border-r-primary font-bold "
                  : ""
              )}
              href="#review"
            >
              Review
            </a>
          </ul>

          <div className="flex-1">
            <div className="px-0 md:px-8 pb-20">
              <h2 className="text-2xl md:text-3xl font-semibold font-OpenSans mb-6">
                Overview of {service?.name} :
              </h2>
              <div id="overview" ref={descRef}></div>
            </div>
            <div id="review" className="px-0 md:px-8 relative md:max-w-3xl ">
              <h2 className="text-2xl md:text-3xl font-semibold font-OpenSans">
                Reviews of {service?.name} :
              </h2>
              <div className="flex py-6 space-x-20">
                <div className="space-y-2">
                  <h1 className="text-5xl md:text-6xl font-semibold">
                    {avgReview ? Math.floor(avgReview) : 0}
                  </h1>
                  {avgReview ? generateStarRating(avgReview, 5) : "☆☆☆☆☆"}
                  <h1>{service?.reviews.length} reviews</h1>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl  font-semibold">
                      {getStarCount(5)}
                    </span>
                    <Progress
                      value={getPercentage(
                        getStarCount(5),
                        service?.reviews.length || 0
                      )}
                      className="w-[60%] bg-slate-200"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl  font-semibold">
                      {getStarCount(4)}
                    </span>
                    <Progress
                      value={getPercentage(
                        getStarCount(4),
                        service?.reviews.length || 0
                      )}
                      className="w-[60%] bg-slate-200"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl  font-semibold">
                      {getStarCount(3)}
                    </span>
                    <Progress
                      value={getPercentage(
                        getStarCount(3),
                        service?.reviews.length || 0
                      )}
                      className="w-[60%] bg-slate-200"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl  font-semibold">
                      {getStarCount(2)}
                    </span>
                    <Progress
                      value={getPercentage(
                        getStarCount(2),
                        service?.reviews.length || 0
                      )}
                      className="w-[60%] bg-slate-200"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl  font-semibold">
                      {getStarCount(1)}
                    </span>
                    <Progress
                      value={getPercentage(
                        getStarCount(1),
                        service?.reviews.length || 0
                      )}
                      className="w-[60%] bg-slate-200"
                    />
                  </div>
                </div>
              </div>
              <div className="max-w-xl space-y-3">
                {service?.reviews
                  ? service.reviews
                      .filter(
                        (review) =>
                          review.status === "approved" && review.rating === 5
                      )
                      .slice(0, 6)
                      .map((review) => {
                        return <ReviewCard review={review} key={review.id} />;
                      })
                  : ""}
              </div>
              <WriteAReview service={service ? service : undefined} />
            </div>
          </div>
        </div>
        <FloatAction service={service ? service : undefined} />
        <OrderNow />
      </Container>
    </>
  );
}

const FloatAction: React.FC<{
  service: IService | undefined;
}> = ({ service }) => {
  const { addToCart } = useCart();
  const { setOpen } = userOrderNow();
  return (
    <Card className="absolute w-full max-w-md bottom-0 right-0 md:top-20 md:w-fit md:right-20 md:h-fit">
      <CardHeader>
        <CardTitle>{service?.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center flex-col items-center space-y-3">
        <p className="text-2xl font-semibold">{service?.price}৳</p>
        <Button
          onClick={() => {
            if (service) {
              addToCart(service);
            }
          }}
        >
          কার্ট এ যোগ করুন
        </Button>

        <Button
          onClick={() => {
            if (service) {
              setOpen(true, service);
            }
          }}
        >
          এখনি অর্ডার করুন
        </Button>
      </CardContent>
    </Card>
  );
};

const reviewSchema = z.object({
  rating: z.number({
    required_error: "Rating is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
  service_id: z.string({
    required_error: "Service ID Not found",
  }),
});

const WriteAReview: React.FC<{ service: IService | undefined }> = () => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = useCallback((star: any) => {
    setSelectedStars(star);
  }, []);

  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  useEffect(() => {
    form.setValue("service_id", id);
  }, [form, id]);
  useEffect(() => {
    form.setValue("rating", selectedStars);
  }, [selectedStars, form]);

  const submit = (data: any) => {
    dispatch(submitReview(data));
    form.reset({ comment: "" });
    setSelectedStars(0);
  };
  return (
    <div className="py-4 px-10 pb-60 md:pb-0 left-0">
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
          <h2 className="text-xl font-semibold">Write a review</h2>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Eg: Excellent service" {...field} />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
            name="comment"
          />
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStarClick(starValue)}
                >
                  {starValue <= selectedStars ? (
                    <StarIcon fill="#000" />
                  ) : (
                    <StarIcon />
                  )}
                </span>
              );
            })}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

const ReviewCard: React.FC<{ review: IReview }> = ({ review }) => {
  const generateStarRating = useCallback(function (
    starCount: number,
    totalLength: number
  ): string {
    const maxStars = 5;
    const maxStarValue = 5;

    if (starCount < 1 || starCount > maxStars) {
      throw new Error("Star count should be between 1 and 5");
    }

    const filledStars = Math.floor((starCount / maxStarValue) * totalLength);
    const emptyStars = totalLength - filledStars;

    const filledStarStr = "★".repeat(filledStars);
    const emptyStarStr = "☆".repeat(emptyStars);

    return filledStarStr + emptyStarStr;
  },
  []);
  return (
    <Card className="w-full h-fit py-0">
      <CardHeader className="py-2">
        <CardTitle>{review.user.name}</CardTitle>
        <CardDescription>
          <span className="flex items-center space-x-2">
            {generateStarRating(review.rating, 5)}
            <span>{dateTime(review.created_at).format("DD MMM YYYY")}</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="py-2">
        <p>{review.comment}</p>
      </CardContent>
    </Card>
  );
};
