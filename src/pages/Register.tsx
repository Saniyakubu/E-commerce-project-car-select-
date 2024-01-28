import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { ContextProvider } from "@/Store";
import { useContext } from "react";
const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full Name must be at least 2 characters.",
  }),
  email: z.string().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});

export function RegisterForm() {
  // 1. Define your form.

  const { setIsLoading, isLoading } = useContext(ContextProvider);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      password: "",
      email: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://carlists.onrender.com/signup",
        values,
        {
          withCredentials: true,
        },
      );
      if (res.data.success === false) {
        alert("unsuccessful");
        return;
      }
      setIsLoading(false);
      toast(res.data.Msg);
      localStorage.setItem("user", JSON.stringify({ user: values.fullName }));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err: any) {
      if (err) {
        setIsLoading(false);
        toast(err?.response?.data?.Msg);
      }
    }
  }

  return (
    <section className="flex h-[100svh] flex-col bg-slate-900">
      <h1 className="self-start p-5 ">
        <Link className="font-bold text-white" to={"/"}>
          Home
        </Link>
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto my-auto w-11/12 rounded-2xl bg-slate-900 p-10 text-white shadow-2xl md:w-2/5"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="full Name"
                    {...field}
                    className=" text-black"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    type="email"
                    {...field}
                    className=" text-black"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    className=" text-black"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <div className="flex items-center justify-between p-3 px-0">
            <Button
              type="submit"
              disabled={isLoading && isLoading}
              className="w-36 bg-white text-base font-bold text-black hover:bg-white"
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>

            <Link className=" font-bold text-white" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default RegisterForm;
