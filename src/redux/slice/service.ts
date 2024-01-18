import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isLoading: boolean;
  services: IService[];
} = {
  isLoading: false,
  services: [],
};

const serviceSlice = createSlice({
  initialState,
  name: "service",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getServices: (state, action) => {
      state.services = action.payload;
      state.isLoading = false;
    },
    getServicesError: (state) => {
      state.isLoading = false;
    },
    createService: (state, action) => {
      state.isLoading = false;
      state.services.push(action.payload);
    },
    createServiceErr: (state) => {
      state.isLoading = false;
    },
    updateService: (state, action) => {
      state.isLoading = false;
      state.services = state.services.map((service) => {
        if (service.id === action.payload.id) {
          return action.payload;
        }
        return service;
      });
    },
    updateServiceErr: (state) => {
      state.isLoading = false;
    },
    deleteService: (state, action) => {
      state.isLoading = false;
      state.services = state.services.filter((service) => {
        return service.id !== action.payload;
      });
    },
    deleteServiceErr: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  createService,
  createServiceErr,
  deleteService,
  deleteServiceErr,
  getServices,
  getServicesError,
  startLoading,
  updateService,
  updateServiceErr,
} = serviceSlice.actions;

export default serviceSlice.reducer;
