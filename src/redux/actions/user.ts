import { api } from "@/api";
import { AppDispatch } from "..";
import {
  getUser,
  getUserErr,
  startLoading,
  updateUserErr,
  updateUserSuccess,
    deleteUser,
    deleteUserErr
} from "@/redux/slice/user";
import toast from "react-hot-toast";
import { signInFunctionParams } from "react-auth-kit/dist/types";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  api
    .get("/users")
    .then((res) => {
      dispatch(getUser(res.data));
    })
    .catch((_err) => {
      if (_err.response) {
        console.log(_err.response);

        toast.error(_err.response.data.error.message);
      }
      dispatch(getUserErr());
    });
};

export const updateUser = (
  id: string,
  data: any,
  signIn: (params: signInFunctionParams) => boolean
) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .patch(`/users/${id}`, data)
      .then((res) => {
        dispatch(updateUserSuccess(res.data.user));
        signIn({
          expiresIn: 3600,
          token: res.data.accessToken,
          tokenType: "bearer",
          authState: res.data.user,
        });
        toast.success("User updated");
      })
      .catch((err) => {
        dispatch(updateUserErr());
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }
      });
  };
};

export const removeUser=(id:string)=>{
  return(dispatch:AppDispatch)=>{
    dispatch(startLoading())

    api.delete(`/users/${id}`).then(res=>{
      toast.success("user deleted")
      dispatch(deleteUser(res.data))
    }).catch(err=>{
      dispatch(deleteUserErr())

      if(err.response){
        toast.error(err?.response?.data?.error?.message)
      }
    })
  }
}