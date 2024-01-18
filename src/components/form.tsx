import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch, useTypedSelector } from "@/redux";
import { submitContact } from "@/redux/actions/contact";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "./ui/select";
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
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>();

  const dispatch = useAppDispatch();

  const submit = (data: any) => {
    dispatch(submitContact(data));
    form.reset({
      email: "",
      name: "",
      number: "",
      service: "",
    });
  };

  const { services } = useTypedSelector((state) => state.service);
  return (
    <div
      id="contact"
      className={
        "bg-contact-bg-1 flex items-center flex-col lg:flex-row space-y-8 py-10 padding-custom"
      }
    >
      <div className={"text-white md:text-center lg:text-left"}>
        <p>জরুরী সেবা</p>
        <h2 className={"text-medium text-white"}>
          অতি জরুরী সেবায় যোগাযোগের মাধ্যম
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className={"grid grid-cols-1 md:grid-cols-5 gap-6"}
        >
          <FormField
            render={({ field }) => (
              <FormItem>
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
                  <SelectTrigger className="w-full">
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
          <Button>পাঠান</Button>
        </form>
      </Form>
    </div>
  );
}
