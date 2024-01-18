import { api } from "@/api";
import { AppDispatch } from "..";
import {
  getBrands,
  getBrandsErr,
  startLoading,
  createBrands,
  createBrandErr,
  deleteBrand,
  deleteBrandErr,
} from "@/redux/slice/brand";
import toast from "react-hot-toast";

export const fetchBrands = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .get("/brands")
      .then((res) => {
        dispatch(getBrands(res.data));
      })
      .catch(() => {
        dispatch(getBrandsErr());
      });
  };
};

export const submitNewBrand = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post("/brands", data)
      .then((res) => {
        toast.success("Brands created");
        dispatch(createBrands(res.data));
      })
      .catch((err) => {
        dispatch(createBrandErr());
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };
};

export const removeBrand = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .delete(`/brands/${id}`)
    .then((res) => {
      toast.success("Member Deleted");
      dispatch(deleteBrand(res.data.id));
    })
    .catch((err) => {
      dispatch(deleteBrandErr());
      if (err.response) {
        toast.error(err.response?.data?.error?.message);
      }
    });
};
