import { ContextProvider } from '@/Store';
import Btn from '@/components/Button/Btn';
import RadioButton from '@/components/radioBtn/radio';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ColorRadioBtn from '@/components/radioBtn/colorRadioBtn';
import { Minus, Plus } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import '../App.css';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CgMenuRight } from 'react-icons/cg';
import { FaCartPlus } from 'react-icons/fa';

const HomePage = () => {
  const { newCarsList, addItemToCart, cartItems, Cars } =
    useContext(ContextProvider);
  const [goal, setGoal] = useState<number>(Math.max(200, Math.min(400, 300)));

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  // grid grid-rows-4 h-fit w-full md:w-2/3 lg:bg-slate-400 lg:w-3/4 xl:w-4/5 place-items-center place-content-center  lg:h-20 xl:h-20   md:h-28 md:right-0 fixed top-48 md:top-40 z-50 right-0   md:bg-black mx-auto border
  return (
    <>
      <div className="fixed top-40 grid grid-cols-3 w-full z-20 glass md:grid-cols-5 md:top-36  md:w-2/3 lg:w-3/4 xl:w-10/12 p-2 md:right-0">
        <Btn />
      </div>

      <section className="flex relative justify-between h-full">
        <aside className="fixed hidden md:flex p-10 left-0 top-32 bottom-0 w-60 border-r-2 flex-col items-center overflow-y-auto">
          <section className="flex w-full flex-col gap-5 mb-5">
            <div>
              <h1 className="text-xl font-bold">{'Colors'}</h1>
            </div>
            <ColorRadioBtn />
          </section>

          <section className="flex w-full flex-col gap-5">
            <div>
              <h1 className=" text-xl font-bold">{'Company'}</h1>
            </div>
            <RadioButton />
          </section>
        </aside>
        <Drawer>
          <DrawerTrigger
            asChild
            className=" right-0 top-9 fixed h-fit bottom-0 block text-end md:hidden  z-50"
          >
            <Button className=" bg-Dark hover:text-black ">
              <CgMenuRight className="text-3xl text-white hover:text-black cursor-pointer hover:text-4xl transition-all" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="block md:hidden">
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(-10)}
                    disabled={goal <= 200}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                      {goal}
                    </div>
                    <div className="text-[0.70rem] uppercase text-muted-foreground">
                      Calories/day
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => onClick(10)}
                    disabled={goal >= 400}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
                <div className="mt-3 h-[120px]"></div>
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="w-full mt-96 md:w-3/4 md:mt-72 md:ml-64 xl:w-full h-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-full p-5 gap-5">
            {newCarsList &&
              newCarsList.map((item: any) => (
                <Card
                  key={item.id}
                  className="flex w-full flex-col justify-between"
                >
                  <CardHeader>
                    <CardContent className="w-full p-0">
                      <img className="w-full" src={item.image} alt="" />
                    </CardContent>
                  </CardHeader>
                  <CardTitle className=" px-5 m-0">
                    Modal: {item.model}
                  </CardTitle>
                  <CardDescription className="px-5 my-2">
                    Company: {item.company}
                    <br />
                    Price: ${item.price}
                    <br />
                    Category: {item.category}
                  </CardDescription>
                  <CardFooter className="py-3 px-5 w-full">
                    <Button
                      onClick={() => addItemToCart(item.id)}
                      className=" w-full"
                    >
                      Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
        <Sheet>
          <SheetTrigger className="fixed right-10 p-2 top-12   z-50 hidden md:block">
            <FaCartPlus className="text-3xl text-white cursor-pointer hover:text-4xl transition-all" />
          </SheetTrigger>
          <SheetContent className="hidden md:block overflow-y-scroll p-2">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription className=" flex flex-col gap-5">
                {Cars &&
                  Cars.map((item: any) => {
                    const { id, model, image, company, price, category } = item;
                    if (cartItems[id] > 0) {
                      return (
                        <div>
                          <Card
                            key={item.id}
                            className="flex w-full justify-between border items-center"
                          >
                            <CardHeader className=" p-0">
                              <CardContent className="w-full p-0">
                                <img
                                  className="w-full p-0"
                                  src={image}
                                  alt=""
                                />
                              </CardContent>
                            </CardHeader>
                            <CardTitle className="text-base px-5 m-0">
                              <div>Products</div>
                              <div>{model}</div>
                            </CardTitle>
                            <CardDescription className="px-5 my-2">
                              Price: ${price}
                            </CardDescription>
                            <CardFooter>
                              <input
                                className="border w-10"
                                type="number"
                                name=""
                                id=""
                              />
                            </CardFooter>
                          </Card>
                        </div>
                      );
                    }
                  })}
                <Button className=" w-full">Add to cart</Button>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </section>
    </>
  );
};

export default HomePage;
