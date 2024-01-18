import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/cart";
import { useAppDispatch } from "@/redux";
import { submitOrder } from "@/redux/actions/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useLocation } from "react-router-dom";

const serviceSchema = z.object({
  id: z.string(),
});

const orderSchema = z.object({
  note: z.string().optional(),
  address: z.string({ required_error: "Address is required" }),
  phone: z.string({ required_error: "Phone is required" }),
  items: z.array(serviceSchema),
  amount: z.number({ required_error: "Amount is required" }),
});
export default function Checkout() {
  const { data, removeFromCart, resetData } = useCart();
  const amount = useMemo(() => data?.reduce((a, b) => a + b.price, 0), [data]);
  const dispatch = useAppDispatch();
  const items = useMemo(() => data?.map((item) => ({ id: item.id })), [data]);
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      items: items,
      amount: amount,
    },
  });

  const submit = (data: any) => {
    dispatch(submitOrder(data));
    form.reset({
      address: "",
      amount: 0,
      items: [],
      note: "",
      phone: "",
    });
    resetData();
  };

  const isAuth = useIsAuthenticated();
  const location = useLocation();

  if (!isAuth()) {
    localStorage.clear();
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }
  return (
    <Container className="padding">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row space-x-0 md:space-x-10 space-y-10 md:space-y-0 w-full">
          <div className="w-full md:w-1/2 relative">
            <p className="flex justify-between items-center font-semibold py-4 border-b border-slate-200">
              <span className="text-center">Service name</span>
              <span className="text-center">Prcie</span>
              <span className="text-center">Remove</span>
            </p>
            <div className="my-3">
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
            <h3 className="text-xl font-semibold font-RobotoMono absolute bottom-0">
              Total: {amount}
            </h3>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="w-full md:w-1/2 space-y-3"
            >
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="Order Note" {...field} />
                    </FormControl>
                  </FormItem>
                )}
                control={form.control}
                name="note"
              />
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Eg: Jashore, sheikhati, bablatola road"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
                control={form.control}
                name="address"
              />

              <FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: 018********" {...field} />
                    </FormControl>
                  </FormItem>
                )}
                control={form.control}
                name="phone"
              />
              <Button>Proceed</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}
