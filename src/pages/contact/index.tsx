import { Button } from "@/components/ui/button.tsx";
import Container from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { submitContact } from "@/redux/actions/contact.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinIcon, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  number: z.string({
    required_error: "Number is required",
  }),
  service: z.string({
    required_error: "Service is required",
  }),
  message: z.string().optional(),
});
export default function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });
  const dispatch = useAppDispatch();

  const submit = (data: any) => {
    dispatch(submitContact(data));
    form.reset({
      email: "",
      name: "",
      number: "",
    });
  };

  const { services } = useTypedSelector((state) => state.service);
  return (
    <Container className={"padding py-10 lg:py-32 bg-contact-bg-2"}>
      <div className={"py-6 space-y-3"}>
        <h2 className={"text-center text-medium text-white font-semibold"}>
          আমাদের সাথে যোগাযোগ করুন{" "}
        </h2>
        <p className="text-primary flex font-semibold font-Lato text-3xl items-center space-x-3 justify-center">
          <PhoneCall size={24} />
          <a href={"tel:+8801781887671"}>+880-1781-887 671</a>
        </p>
        <p className="flex justify-center text-primary text-lg font-semibold items-center">
          <MapPinIcon />{" "}
          <span>নতুন খয়েরতলা (তেঁতুলতলা মোড়), পালবাড়ী, যশোর</span>
        </p>
      </div>
      <Form {...form}>
        <form
          className={
            "w-full max-w-xl mx-auto border border-slate-100 px-4 py-2 rounded-md shadow-2xl space-y-3 bg-white"
          }
          onSubmit={form.handleSubmit(submit)}
        >
          <h2 className={"text-2xl font-semibold"}>মেসেজ পাঠান </h2>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>নাম</FormLabel>
                <FormControl>
                  <Input placeholder={"নাম"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="name"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>ইমেইল</FormLabel>
                <FormControl>
                  <Input placeholder={"ইমেইল"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="email"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>নাম্বার</FormLabel>
                <FormControl>
                  <Input placeholder={"নাম্বার"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="number"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={"পরিষেবা"} />
                  </SelectTrigger>
                  <SelectContent>
                    {services?.map((service) => {
                      return (
                        <SelectItem key={service.id} value={service.name}>
                          {service.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            name="service"
            control={form.control}
          />

          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>মেসেজ</FormLabel>
                <FormControl>
                  <Input placeholder={"মেসেজ"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="message"
            control={form.control}
          />
          <Button>পাঠান</Button>
        </form>
      </Form>
    </Container>
  );
}
