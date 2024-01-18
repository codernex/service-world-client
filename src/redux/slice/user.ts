import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isLoading: boolean;
  user: IUser[];
} = {
  isLoading: false,
  user: [],
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    startLoading: (state) => {
      state.isLoading = false;
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserErr: (state) => {
      state.isLoading = false;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = state.user.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    updateUserErr: (state) => {
      state.isLoading = false;
    },
    deleteUser:(state,action)=>{
      state.isLoading=false;
      state.user=state.user.filter(user=>user.id!==action.payload.id)
    },
    deleteUserErr:(state)=>{
      state.isLoading=false
    }
  },
});

export const {
  getUser,
  startLoading,
  getUserErr,
  updateUserSuccess,
  updateUserErr,
    deleteUserErr,
    deleteUser
} = userSlice.actions;

export default userSlice.reducer;
