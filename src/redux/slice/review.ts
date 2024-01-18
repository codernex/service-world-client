import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isLoading: boolean;
  reviews: IReview[];
} = {
  isLoading: false,
  reviews: [],
};

const reviewSlice = createSlice({
  initialState,
  name: "review",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getReviews: (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
    },
    getReviewsError: (state) => {
      state.isLoading = false;
    },
    createReview: (state, action) => {
      state.isLoading = false;
      state.reviews.push(action.payload);
    },
    createReviewErr: (state) => {
      state.isLoading = false;
    },
    updateReviewData:(state,action)=>{
      state.isLoading=false
      state.reviews= state.reviews.map((review)=>{
        if(review.id===action.payload.id){
          return action.payload
        }
        return review;
      })
    },
    updateReviewErr:(state)=>{
      state.isLoading=false
    }
  },
});

export const {
  createReview,
  createReviewErr,
  getReviews,
  getReviewsError,
  startLoading,
    updateReviewErr,updateReviewData
} = reviewSlice.actions;

export default reviewSlice.reducer;
