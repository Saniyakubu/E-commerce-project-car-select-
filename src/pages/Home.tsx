import { ContextProvider } from "@/Store";
import Btn from "@/components/Button/Btn";
import RadioButton from "@/components/radioBtn/radio";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { CgMenuRight } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import ColorRadioBtn from "@/components/radioBtn/colorRadioBtn";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { carType } from "@/Store";
const HomePage = () => {
  const {
    filterCarsList,
    newCarsList,
    addItemToCart,
    cartItems,
    removeItemFromCart,
    decrementItemFromCart,
    value,
    totalAmount,
    Checkouts,
    isLoading,
  } = useContext(ContextProvider);

  const totalPrice = totalAmount();

  return (
    <>
      <div className="glass fixed top-40 z-20 grid w-full grid-cols-3 p-2 md:right-0  md:top-36 md:w-2/3 md:grid-cols-5 lg:w-3/4 xl:w-10/12">
        <Btn />
      </div>
      <section className="relative flex h-full justify-between">
        <aside className="fixed bottom-0 left-0 top-32 hidden w-60 flex-col items-center overflow-y-auto scroll-smooth border-r-2 p-10 focus:scroll-auto md:flex">
          <section className="mb-5 flex w-full flex-col gap-5">
            <div>
              <h1 className="text-xl font-bold">{"Colors"}</h1>
            </div>
            <ColorRadioBtn />
          </section>

          <section className="flex w-full flex-col gap-5">
            <div>
              <h1 className=" text-xl font-bold">{"Company"}</h1>
            </div>
            <RadioButton />
          </section>
        </aside>
        <Drawer>
          <DrawerTrigger
            asChild
            className=" fixed bottom-0 right-0 top-9 z-50 block h-fit text-end  md:hidden"
          >
            <Button className=" bg-Dark hover:text-black ">
              <CgMenuRight className="cursor-pointer text-3xl text-white transition-all hover:text-4xl hover:text-black" />
            </Button>
          </DrawerTrigger>

          <DrawerContent className="z-50 block md:hidden">
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>My Cart</DrawerTitle>
                <DrawerDescription>
                  Items you add in cart will be here
                </DrawerDescription>
              </DrawerHeader>
              {filterCarsList &&
                filterCarsList.map((item: carType) => {
                  const { _id, model, image, price } = item;
                  if (cartItems[_id] > 0) {
                    return (
                      <div key={item._id}>
                        <Card
                          key={item._id}
                          className="mb-5 flex w-full items-center justify-between gap-3 border"
                        >
                          <CardHeader className=" w-full flex-1 p-0">
                            <CardContent className="w-full p-0">
                              <img
                                loading="lazy"
                                className="w-full"
                                src={image}
                                alt=""
                              />
                            </CardContent>
                          </CardHeader>
                          <CardTitle className="text-base">
                            <div>Products</div>
                            <div className=" break-keep">{model}</div>
                          </CardTitle>
                          <div className="">
                            <div>Price</div>
                            <div>${price}</div>
                          </div>
                          <CardFooter className="flex flex-col justify-center pt-5">
                            <div>Quantity</div>
                            <div>x{cartItems[_id]}</div>
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  }
                })}
              <DrawerFooter>
                {value ? (
                  <div>
                    <div className="w-full p-5 text-end">
                      <h1 className="text-xl font-bold">
                        ${totalPrice?.toLocaleString()}
                      </h1>
                    </div>
                    <Button className=" w-full">Check Out</Button>
                  </div>
                ) : (
                  <div className=" mx-20 mt-10 w-full">
                    <h1 className=" text-2xl font-bold">Your Cart Is Empty</h1>
                  </div>
                )}
                <DrawerClose asChild>
                  <Button variant="outline">Close Cart</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        <div className="mt-96 h-full w-full md:ml-64 md:mt-72 md:w-3/4 xl:w-full">
          {isLoading ? (
            <div className="mb-10 flex flex-wrap justify-center gap-5">
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
              <Skeleton className="h-[400px] w-[300px]" />
            </div>
          ) : (
            <div className="grid h-full w-full grid-cols-1 gap-5 p-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {newCarsList &&
                newCarsList.map((item: carType) => (
                  <Card
                    key={item._id}
                    className="flex w-full flex-col justify-between"
                  >
                    <CardHeader>
                      <CardContent className="w-full p-0">
                        <img
                          loading="lazy"
                          className="w-full"
                          src={item.image}
                          alt=""
                        />
                      </CardContent>
                    </CardHeader>
                    <CardTitle className=" m-0 px-5">
                      Modal: {item.model}
                    </CardTitle>
                    <CardDescription className="my-2 px-5">
                      Company: {item.company}
                      <br />
                      Price: ${item.price}
                      <br />
                      Category: {item.category}
                    </CardDescription>
                    <CardFooter className="w-full px-5 py-3">
                      {cartItems[item._id] > 0 ? (
                        <div className="flex w-full items-center justify-between transition-all">
                          <Button onClick={() => removeItemFromCart(item._id)}>
                            Remove
                          </Button>

                          <button
                            className="cursor-pointer p-1 hover:text-xl"
                            onClick={() => decrementItemFromCart(item._id)}
                          >
                            <FaMinus />
                          </button>
                          {cartItems[item._id]}
                          <button
                            className="cursor-pointer p-1 hover:text-xl"
                            onClick={() => addItemToCart(item._id)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => addItemToCart(item._id)}
                          className="w-full transition-all"
                        >
                          Add to cart
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
            </div>
          )}
        </div>
        <Sheet>
          <SheetTrigger className="fixed right-10 top-12 z-50 hidden p-2 md:block">
            <div className="cursor-pointer text-3xl text-white transition-all hover:text-4xl">
              <FaCartPlus />
            </div>
          </SheetTrigger>
          <SheetContent className="hidden overflow-x-hidden overflow-y-scroll p-2 md:block ">
            <SheetHeader>
              <SheetTitle className=" text-xl font-bold">My Cart</SheetTitle>
              <SheetDescription className=" flex w-full flex-col gap-5 text-center">
                Product will be shown here
              </SheetDescription>
            </SheetHeader>
            <div className="flex w-full flex-col gap-5">
              {filterCarsList &&
                filterCarsList.map((item: carType) => {
                  const { _id, model, image, price } = item;
                  if (cartItems[_id] > 0) {
                    return (
                      <div key={item._id}>
                        <Card
                          key={item._id}
                          className="grid w-full grid-cols-4 place-content-between place-items-center gap-8 border p-4"
                        >
                          <CardHeader className=" p-0">
                            <CardContent className="p-0">
                              <img
                                loading="lazy"
                                className="w-full "
                                src={image}
                                alt=""
                              />
                            </CardContent>
                          </CardHeader>
                          <CardTitle className="flex flex-col justify-center text-base">
                            <span className="text-sm">Products</span>
                            <span className=" break-keep">
                              {model.split(" ")[0]}
                            </span>
                          </CardTitle>
                          <CardDescription className="flex flex-col justify-center">
                            <span>Price</span>
                            <span>${price.toLocaleString()}</span>
                          </CardDescription>
                          <CardFooter className="flex flex-col justify-center p-0">
                            <div>Quantity</div>
                            <div>x{cartItems[_id]}</div>
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  }
                })}
              {value ? (
                <div>
                  <div className=" w-full p-5 text-end">
                    <h1 className="text-xl font-bold">
                      ${totalPrice?.toLocaleString()}
                    </h1>
                  </div>
                  <Button
                    disabled={isLoading ? isLoading : false}
                    onClick={() =>
                      Checkouts({
                        cartItems: {
                          ...cartItems,
                        },
                      })
                    }
                    className=" w-full"
                  >
                    Check Out
                  </Button>
                </div>
              ) : (
                <div className=" mx-20 mt-10 w-full">
                  <div className=" text-2xl font-bold">Your Cart Is Empty</div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </>
  );
};

export default HomePage;
