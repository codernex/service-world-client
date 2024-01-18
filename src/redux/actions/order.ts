import { api } from "@/api";
import { AppDispatch } from "..";
import {
  createOrder,
  createOrderErr,
  getOrders,
  getOrdersError,
  startLoading,
  updateOrder,
  updateOrderErr,
} from "@/redux/slice/order";
import toast from "react-hot-toast";

export const submitOrder = (data: any) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .post("/orders", data)
    .then((res) => {
      dispatch(createOrder(res.data));
      toast.success("Order placed");
    })
    .catch((err) => {
      dispatch(createOrderErr());
      if (err.response) {
        toast.error(err.response?.data?.error?.message);
      }
    });
};

export const fetchOrders = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .get("/orders")
    .then((res) => {
      dispatch(getOrders(res.data));
    })
    .catch((err) => {
      dispatch(getOrdersError());
      if (err.response) toast.error(err.response.data.error?.message);
    });
};

export const assignWorker = (id: string, worker_id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .patch(`/orders/${id}`, { worker_id })
      .then((res) => {
        dispatch(updateOrder(res.data));
        toast.success("Worker assigned");
      })
      .catch((err) => {
        dispatch(updateOrderErr());
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };
};

export const updateStatus = (id: string, status: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .patch(`/orders/${id}`, { status })
      .then((res) => {
        dispatch(updateOrder(res.data));
        toast.success("Status Updated");
      })
      .catch((err) => {
        dispatch(updateOrder(err.response.data.error.message));
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };
};
