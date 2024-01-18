import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  brands: IBrand[];
  isLoading: boolean;
} = {
  brands: [],
  isLoading: false,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getBrands: (state, action) => {
      state.brands = action.payload;
      state.isLoading = false;
    },
    getBrandsErr: (state) => {
      state.isLoading = false;
    },
    createBrands: (state, action) => {
      state.isLoading = false;
      state.brands.push(action.payload);
    },

    createBrandErr: (state) => {
      state.isLoading = false;
    },
    deleteBrand: (state, action) => {
      state.isLoading = false;
      state.brands = state.brands.filter((service) => {
        return service.id !== action.payload;
      });
    },
    deleteBrandErr: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  createBrands,
  createBrandErr,
  getBrands,
  getBrandsErr,
  startLoading,
  deleteBrand,
  deleteBrandErr,
} = brandSlice.actions;

export default brandSlice.reducer;
