import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux";
import { updateUser } from "@/redux/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import { z } from "zod";
const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  mobile: z.string().optional(),
  username: z.string().optional(),
});

const Profile = () => {
  const authUser = useAuthUser();
  const user = useMemo(() => authUser(), [authUser]) as IUser;
  const signIn = useSignIn();
  const form = useForm<z.infer<typeof updateProfileSchema>>({
    defaultValues: user
      ? {
          email: user.email,
          mobile: user.mobile,
          name: user.name,
          username: user.username,
        }
      : {
          email: "",
          mobile: "",
          name: "",
          password: "",
          username: "",
        },
    resolver: zodResolver(updateProfileSchema),
  });
  const dispatch = useAppDispatch();
  const submit = (data: any) => {
    if (user.id) {
      dispatch(updateUser(user.id, data, signIn));
    }
    console.log(data);
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-4  shadow-xl px-8 py-6 bg-slate-800 rounded-lg"
        >
          <h2 className="text-center text-2xl font-semibold">Profile</h2>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="EG: John Doe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
            name="name"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="EG: codernex"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
            name="username"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="EG: you2u@example.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
            name="email"
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormDescription>
                  Don't type in this field if you don't want to change your
                  current password
                </FormDescription>
                <FormControl>
                  <Input
                    className="text-black"
                    placeholder="EG: *******"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
            name="password"
          />
          <Button type="submit">Update Profile</Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
