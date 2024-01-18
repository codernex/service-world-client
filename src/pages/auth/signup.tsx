import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useMemo } from "react";

enum UserRole {
  PROVIDER = "provider",
  USER = "user",
}
const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
  role: z.nativeEnum(UserRole, { required_error: "Role is required" }),
  name: z.string({ required_error: "Name is required" }),
  username: z.string({ required_error: "Username is required" }),
  mobile: z.string().optional(),
  address: z.string({ required_error: "Address is required" }),
  profession: z.string().optional(),
});
export default function SignUp() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const auth = useIsAuthenticated();
  const signIn = useSignIn();
  const isAuthentiacted = useMemo(() => auth(), [auth]);

  if (isAuthentiacted) {
    return Navigate({
      to: "/",
    });
  }

  const submit = (data: any) => {
    api
      .post("/users", data)
      .then((res) => {
        if (res.data) {
          signIn({
            expiresIn: 3600,
            token: res.data.accessToken,
            tokenType: "bearer",
            authState: res.data.user,
          });
          if (
            res.data.user.role === "admin" ||
            res.data.user.role === "provider"
          ) {
            navigate("/dashboard");
          } else {
            navigate("/services");
          }
        }
      })
      .catch((err: any) => {
        toast.error(err.response.data.error.message);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-3 bg-slate-50 shadow-xl px-6 py-4 rounded-md"
        >
          <h1 className="text-center text-2xl font-semibold">Sign Up</h1>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="username"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: 018********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="mobile"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Eg: Sheikhati, Bablatola" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="address"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provider/Users</FormLabel>
                <FormDescription>
                  Are you willing to provide services? Or want to order
                  services?
                </FormDescription>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="uppercase">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem className="uppercase" key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            name="role"
            control={form.control}
          />

          {form.getValues("role") === "provider" ? (
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg: Electrician" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="profession"
              control={form.control}
            />
          ) : (
            ""
          )}
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Passowrd" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="password"
            control={form.control}
          />
          <div className="space-x-3">
            <Button>Signup</Button>

            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              className="underline"
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
