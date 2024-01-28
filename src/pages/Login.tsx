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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ContextProvider } from "@/Store";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const navigate = useNavigate();

  const { setToken, setIsLoading, isLoading } = useContext(ContextProvider);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://carlists.onrender.com/login",
        values,
        {
          withCredentials: true,
        },
      );
      if (res) {
        setIsLoading(false);
      }
      toast(res.data.Msg);
      localStorage.setItem("user", JSON.stringify({ user: values.email }));
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
    <section className="flex h-[100svh] flex-col items-center bg-slate-900">
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
            name="email"
            render={({ field }) => (
              <FormItem className="mb-5">
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
              <FormItem className="mb-5">
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

            <Link className=" font-bold text-white" to={"/signUp"}>
              SignUp
            </Link>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default LoginForm;
