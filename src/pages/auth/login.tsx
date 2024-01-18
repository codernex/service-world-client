import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { useForm } from "react-hook-form";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/api";
import toast from "react-hot-toast";

const loginSchema = z.object({
  usernameOrEmail: z.string({
    required_error: "Email Or Username is required",
  }),
  password: z.string({ required_error: "Password is required" }),
});
export default function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const auth = useIsAuthenticated();
  const isAuthentiacted = useMemo(() => auth(), [auth]);
  const signIn = useSignIn();

  if (isAuthentiacted) {
    return Navigate({
      to: "/",
    });
  }

  const submit = (data: any) => {
    api
      .post("/auth", data)
      .then((res: any) => {
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
            navigate("/");
          }
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error?.message);
      });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-3 bg-slate-50 shadow-xl px-6 py-4 rounded-md"
        >
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="usernameOrEmail"
            control={form.control}
          />
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name="password"
            control={form.control}
          />
          <div className="space-x-3">
            <Button>Login</Button>

            <Button onClick={() => navigate("/signup")} variant="outline">
              Register
            </Button>
          </div>

          <div className={"mt-6"}>
            <Link  to={'/'}>Go Home</Link>
          </div>
        </form>
      </Form>

    </div>
  );
}
