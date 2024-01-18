import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isLoading: boolean;
  orders: IOrder[];
} = {
  isLoading: false,
  orders: [],
};

const orderSlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    getOrdersError: (state) => {
      state.isLoading = false;
    },
    createOrder: (state, action) => {
      state.isLoading = false;
      state.orders.push(action.payload);
    },
    createOrderErr: (state) => {
      state.isLoading = false;
    },
    updateOrder: (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.map((order) => {
        if (order.id === action.payload.id) {
          return action.payload;
        }
        return order;
      });
    },
    updateOrderErr: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  createOrder,
  createOrderErr,
  getOrders,
  getOrdersError,
  startLoading,
  updateOrder,
  updateOrderErr,
} = orderSlice.actions;

export default orderSlice.reducer;
