import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  teams: ITeam[];
  isLoading: boolean;
} = {
  teams: [],
  isLoading: false,
};

const teamslice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getTeams: (state, action) => {
      state.teams = action.payload;
      state.isLoading = false;
    },
    getTeamsErr: (state) => {
      state.isLoading = false;
    },
    create: (state, action) => {
      state.isLoading = false;
      state.teams.push(action.payload);
    },

    createErr: (state) => {
      state.isLoading = false;
    },
    deleteTeam: (state, action) => {
      state.isLoading = false;
      state.teams = state.teams.filter((service) => {
        return service.id !== action.payload;
      });
    },
    deleteTeamErr: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  create,
  createErr,
  getTeams,
  getTeamsErr,
  startLoading,
  deleteTeam,
  deleteTeamErr,
} = teamslice.actions;

export default teamslice.reducer;
