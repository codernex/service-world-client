import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userOrderNow } from "@/hooks/cart";
import { useAppDispatch } from "@/redux";
import { submitOrder } from "@/redux/actions/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
export default function OrderNow() {
  const { data, open, setOpen } = userOrderNow();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
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
    setOpen(false, undefined);
  };

  useEffect(() => {
    if (data) {
      form.setValue("items", [{ id: data?.id }]);
      form.setValue("amount", data.price);
    }
  }, [form, data]);

  const isAuth = useIsAuthenticated();
  const isAuthenticated = useMemo(() => isAuth(), [isAuth]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {!isAuthenticated ? (
          <p>
            Please{" "}
            <a className="text-primary underline" href="/login">
              Login
            </a>{" "}
            to order
          </p>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-10 w-full">
              <div className="w-full relative">
                <p className="flex justify-between items-center font-semibold py-4 border-b border-slate-200">
                  <span className="text-center">Service name</span>
                  <span className="text-center">Prcie</span>
                </p>
                <div className="my-3">
                  <p className="flex justify-between items-center font-semibold">
                    <span>{data?.name}</span> <span>{data?.price}</span>{" "}
                  </p>
                </div>
                <h3 className="text-xl font-semibold font-RobotoMono">
                  Total: {data?.price}
                </h3>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="w-full space-y-3"
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
                  <Button type="submit">Proceed</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
