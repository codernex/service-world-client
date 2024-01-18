import toast from "react-hot-toast";
import { create } from "zustand";

interface ICart {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: IService[];
  addToCart: (data: IService) => void;
  removeFromCart: (data: string) => void;
  setData: (data: IService[]) => void;
  resetData: () => void;
}

export const useCart = create<ICart>((set) => ({
  open: false,
  setOpen: (open) => set((state) => ({ ...state, open })),
  data: undefined,
  addToCart: (data) =>
    set((state) => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]") as IService[];

      if (cart.find((item) => item.id === data.id)) {
        toast.error("Item already in cart");
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...(state.data || []), data])
        );
        toast.success("Item Added To Cart");
      }

      cart = JSON.parse(localStorage.getItem("cart") || "[]") as IService[];

      return {
        data: cart,
      };
    }),
  removeFromCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as IService[];

    const filteredCart = cart.filter((data) => data.id !== id);

    localStorage.setItem("cart", JSON.stringify(filteredCart));

    return set({
      data: filteredCart,
    });
  },
  setData(data) {
    return set({
      data,
    });
  },
  resetData() {
    localStorage.setItem("cart", "[]");
    return set({
      data: undefined,
    });
  },
}));

interface IOrderNow {
  open: boolean;
  setOpen: (open: boolean, data?: IService) => void;
  data?: IService;
}

export const userOrderNow = create<IOrderNow>((set) => ({
  open: false,
  setOpen: (open, data) => set(() => ({ open, data })),
  data: undefined,
}));
