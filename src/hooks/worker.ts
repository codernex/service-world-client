import { create } from "zustand";

export const useWorkerDialog = create<{
  open: boolean;
  setOpen: (open: boolean, data?: IOrder) => void;
  data?: IOrder;
}>((set) => ({
  open: false,
  setOpen(open, data) {
    return set((state) => ({ ...state, open, data }));
  },
  data: undefined,
}));

export const useUpdateStatus = create<{
  open: boolean;
  setOpen: (open: boolean, data?: IOrder) => void;
  data?: IOrder;
}>((set) => ({
  open: false,
  setOpen(open, data) {
    return set((state) => ({ ...state, open, data }));
  },
  data: undefined,
}));
