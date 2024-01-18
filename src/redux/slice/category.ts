import { createSlice } from "@reduxjs/toolkit";
const initialState: {
  isLoading: boolean;
  categories: ICategory[];
} = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    getCategoriesErr: (state) => {
      state.isLoading = false;
    },
    createCategories: (state, action) => {
      state.categories.push(action.payload);
      state.isLoading = false;
    },
    createCategoriesErr: (state) => {
      state.isLoading = false;
    },
    deleteCategory(state,action){
      state.isLoading=false;
      state.categories= state.categories.filter((cat)=>cat.id!==action.payload.id)
    },
    deleteCategoryErr(state){
      state.isLoading=false
    }
  },
});

export const {
  createCategories,
  createCategoriesErr,
  getCategories,
  getCategoriesErr,
  startLoading,
    deleteCategoryErr,
    deleteCategory
} = categorySlice.actions;
export default categorySlice.reducer;
