import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { useCart } from "@/hooks/cart";
import { XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Cart = () => {
  const { open, setOpen, data, removeFromCart } = useCart();
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold font-RobotoMono">
            Cart
          </DialogTitle>
        </DialogHeader>
        <div className="py-5">
          {data?.map((item) => (
            <p
              className="flex justify-between items-center font-semibold"
              key={item.id}
            >
              <span>{item.name}</span> <span>{item.price}</span>{" "}
              <XIcon
                className="cursor-pointer"
                onClick={() => removeFromCart(item.id)}
              />
            </p>
          ))}
        </div>
        <p className="text-xl font-semibold font-RobotoMono space-y-4">
          Total: {data?.reduce((a, b) => a + b.price, 0)}৳
        </p>
        <Button
          onClick={() => {
            {
              data?.length
                ? navigate("/checkout", { replace: true })
                : toast.error("No items in cart");
            }
            setOpen(false);
          }}
        >
          Checkout
        </Button>
      </DialogContent>
    </Dialog>
  );
};
