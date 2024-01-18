import { api } from "@/api";
import { AppDispatch } from "..";
import {
  createContact,
  createContactErr,
  getContact,
  getContactErr,
  startLoading,
} from "@/redux/slice/contact";
import toast from "react-hot-toast";

export const fetchContacts = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .get("/contacts")
    .then((res) => {
      dispatch(getContact(res.data));
    })
    .catch(() => {
      dispatch(getContactErr());
    });
};

export const submitContact = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post("/contacts", data)
      .then((res) => {
        dispatch(createContact(res.data));
        toast.success("We will contact you shortly");
      })
      .catch((err) => {
        dispatch(createContactErr());
        if (err.response) {
          toast.error(err.response.data.error?.message);
        }
      });
  };
};
