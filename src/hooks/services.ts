import { create } from "zustand";

interface IModal {
  open: boolean;
  setOpen: (open: boolean, data?: IService) => void;
  data?: IService;
}

export const useServiceModal = create<IModal>((set) => ({
  open: false,
  data: undefined,
  setOpen: (open, data) => set({ open: open, data }),
}));
