import { api } from "@/api";
import { AppDispatch } from "..";
import {
  getServices,
  getServicesError,
  startLoading,
  updateService as update,
  updateServiceErr,
  deleteService as deleteData,
  deleteServiceErr,
  createService as create,
  createServiceErr,
} from "@/redux/slice/service";
import toast from "react-hot-toast";

export const fetchServices = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .get("/services")
    .then((res) => {
      dispatch(getServices(res.data));
    })
    .catch(() => {
      dispatch(getServicesError());
    });
};

export const createService = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .post("/services", data)
    .then((res) => {
      toast.success("Service Created");
      dispatch(create(res.data));
    })
    .catch((err) => {
      dispatch(createServiceErr());
      if (err.response) {
        toast.error(err.response?.data?.error?.message);
      }
    });
};

export const updateService =
  (id: string, data: any) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .patch(`/services/${id}`, data)
      .then((res) => {
        toast.success("Services updated");
        dispatch(update(res.data));
      })
      .catch((err) => {
        dispatch(updateServiceErr());
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };

export const deleteServices = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .delete(`/services/${id}`)
    .then((res) => {
      toast.success("Services Deleted");
      dispatch(deleteData(res.data.id));
    })
    .catch((err) => {
      dispatch(deleteServiceErr());
      if (err.response) {
        toast.error(err.response?.data?.error?.message);
      }
    });
};
