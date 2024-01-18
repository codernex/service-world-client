import { api } from "@/api";
import { AppDispatch } from "..";
import {
    createReview,
    createReviewErr, getReviews, getReviewsError,
    startLoading, updateReviewData, updateReviewErr,
} from "@/redux/slice/review";
import toast from "react-hot-toast";

export const submitReview = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post("/reviews", data)
      .then((res) => {
        dispatch(createReview(res.data));
        toast.success("Review submitted");
      })
      .catch((err) => {
        dispatch(createReviewErr());
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };
};

export const fetchReviews = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
        .get("/reviews")
        .then((res) => {
          dispatch(getReviews(res.data));
        })
        .catch((err) => {
          dispatch(getReviewsError());
          if (err.response) {
            toast.error(err.response?.data?.error?.message);
          }
        });
  };
};


export const updateReviews = (id:string,status:IReview["status"]) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
        .patch(`/reviews/${id}`,{status})
        .then((res) => {
          dispatch(updateReviewData(res.data));
        })
        .catch((err) => {
          dispatch(updateReviewErr());
          if (err.response) {
            toast.error(err.response?.data?.error?.message);
          }
        });
  };
};