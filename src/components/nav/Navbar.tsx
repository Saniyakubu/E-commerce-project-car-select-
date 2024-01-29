import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContextProvider } from "@/Store";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const FormSchema = z.object({
  searchInput: z.string().min(1, {
    message: "Character must be at least 1 characters.",
  }),
});

const Navbar = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchInput: "",
    },
  });

  const [user, isUser] = useState(
    JSON.parse(localStorage.getItem("user") as string) || null,
  );

  useEffect(() => {
    isUser(localStorage.getItem("user") as string);
  }, [user]);

  const { inputValue, setInputValue } = useContext(ContextProvider);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setInputValue(data.searchInput);
    console.log(inputValue);
    console.log(data);
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  async function logoutUserOUT() {
    await axios.get("https://carlists.onrender.com/logout", {
      withCredentials: true,
    });

    localStorage.clear();
    isUser(null);
    // location.reload();
  }

  // align-self: flex-end;
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-screen items-center bg-Dark p-2 md:p-5">
      <nav className="flex w-full flex-col items-center justify-around  md:flex-row md:justify-normal">
        <div className="m-5 flex w-full items-center justify-between md:block md:w-fit">
          <h1 className="justify-self-start text-2xl font-bold text-white">
            Car Select
          </h1>
          <div className=" md:hidden">
            {/* <CgMenuRight className=" text-white text-3xl" /> */}
          </div>
        </div>
        <div className="mx-auto flex w-full items-center justify-between p-3 md:w-2/3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative mx-auto flex w-80  items-center lg:w-96"
            >
              <FormField
                control={form.control}
                name="searchInput"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Search Input</FormLabel> */}
                    <FormControl>
                      <Input
                        className="relative mx-auto  w-80 p-6 text-lg lg:w-96"
                        placeholder="Search Car"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="absolute bottom-0 right-0 top-1 mr-1 p-5"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
          <div className="hidden p-5 md:block ">
            {user ? (
              <Button onClick={logoutUserOUT}>Logout</Button>
            ) : (
              <Button>
                <Link to={"/login"}>SignUp/Login</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
