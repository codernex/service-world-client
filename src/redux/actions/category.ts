import {api} from "@/api";
import {AppDispatch} from "..";
import {
  createCategories as create,
  createCategoriesErr,
  deleteCategory,
  deleteCategoryErr,
  getCategories,
  getCategoriesErr,
  startLoading,
} from "@/redux/slice/category";
import toast from "react-hot-toast";

export const fetchCategories = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .get("/categories")
      .then((res) => {
        dispatch(getCategories(res.data));
      })
      .catch(() => {
        dispatch(getCategoriesErr());
      });
  };
};

export const createCategories = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post("/categories", data)
      .then((res) => {
        dispatch(create(res.data));
        toast.success("Category created");
      })
      .catch((err) => {
        createCategoriesErr();
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };
};

export const removeCat = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
      .delete(`/categories/${id}`)
      .then((res) => {
        toast.success("Category Deleted");
        dispatch(deleteCategory(res.data));
      })
      .catch((err) => {
        dispatch(deleteCategoryErr());
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
};

