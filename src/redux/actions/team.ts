import { api } from "@/api";
import { AppDispatch } from "..";
import {
  getTeams,
  getTeamsErr,
  startLoading,
  create,
  createErr,
  deleteTeam,
  deleteTeamErr,
} from "@/redux/slice/team";
import toast from "react-hot-toast";

export const fetchTeams = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .get("/teams")
      .then((res) => {
        dispatch(getTeams(res.data));
      })
      .catch(() => {
        dispatch(getTeamsErr());
      });
  };
};

export const createTeam = (data: any) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    api
      .post("/teams", data)
      .then((res) => {
        toast.success("Team Member created");
        dispatch(create(res.data));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response?.data?.error?.message);
        }

        dispatch(createErr());
      });
  };
};

export const removeTeam = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());
  api
    .delete(`/teams/${id}`)
    .then((res) => {
      toast.success("Member Deleted");
      dispatch(deleteTeam(res.data.id));
    })
    .catch((err) => {
      dispatch(deleteTeamErr());
      if (err.response) {
        toast.error(err.response.data.error?.message);
      }
    });
};
