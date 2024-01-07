import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaCartPlus } from 'react-icons/fa';
import { CgMenuRight } from 'react-icons/cg';
import { ContextProvider } from '@/Store';
import { useContext } from 'react';
import RadioButton from '../radioBtn/radio';

const FormSchema = z.object({
  searchInput: z.string().min(1, {
    message: 'Character must be at least 1 characters.',
  }),
});

const Navbar = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchInput: '',
    },
  });

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

  return (
    <header className="bg-Dark fixed flex items-center p-5 w-screen z-50">
      <nav className="flex flex-col md:flex-row justify-between items-center w-full">
        <div className="w-full md:w-fit flex items-center justify-between m-5 md:block">
          <h1 className="text-white font-bold">Lorem ipsum </h1>
          <div className=" md:hidden">
            <CgMenuRight className=" text-white text-3xl" />
          </div>
        </div>
        <div className="flex w-full justify-between items-center border md:w-4/6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center relative"
            >
              <FormField
                control={form.control}
                name="searchInput"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Search Input</FormLabel> */}
                    <FormControl>
                      <Input
                        className="w-80  lg:w-96 md:w-72 md:bg-blue-300 p-6 relative"
                        placeholder="Search Car"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className=" absolute top-1 p-5 mr-1 right-0 bottom-0"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
          <div className="hidden justify-between items-center border lg:w-72  md:flex p-5 ">
            <Avatar className=" cursor-pointer">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <FaCartPlus className=" text-4xl" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;