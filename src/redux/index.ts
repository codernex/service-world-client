import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import service from "./slice/service";
import order from "./slice/order";
import review from "./slice/review";
import user from "./slice/user";
import contact from "./slice/contact";
import category from "./slice/category";
import brand from "./slice/brand";
import team from "./slice/team";
const store = configureStore({
  reducer: { service, order, review, user, contact, category, brand, team },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
