import { ContextProvider } from '@/Store';
import Btn from '@/components/Button/Btn';
import RadioButton from '@/components/radioBtn/radio';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { CgMenuRight } from 'react-icons/cg';
import { FaCartPlus } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa';
import ColorRadioBtn from '@/components/radioBtn/colorRadioBtn';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

import { carType } from '@/Store';
const HomePage = () => {
  const {
    newCarsList,
    addItemToCart,
    cartItems,
    Cars,
    removeItemFromCart,
    decrementItemFromCart,
    value,
  } = useContext(ContextProvider);
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
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>My Cart</DrawerTitle>
                <DrawerDescription>
                  Items you add in cart will be here
                </DrawerDescription>
              </DrawerHeader>
              {Cars &&
                Cars.map((item: carType) => {
                  const { id, model, image, price } = item;
                  if (cartItems[id] > 0) {
                    return (
                      <div key={item.id}>
                        <Card
                          key={item.id}
                          className="flex items-center justify-between w-full border gap-3 mb-5"
                        >
                          <CardHeader className=" w-full flex-1 p-0">
                            <CardContent className="w-full p-0">
                              <img className="w-full" src={image} alt="" />
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
                            <div>x{cartItems[id]}</div>
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  }
                })}
              <DrawerFooter>
                {value ? (
                  <div>
                    <Button className=" w-full">Check Out</Button>
                  </div>
                ) : (
                  <div className=" w-full mx-20 mt-10">
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

        <div className="w-full mt-96 md:w-3/4 md:mt-72 md:ml-64 xl:w-full h-full">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-full p-5 gap-5">
            {newCarsList &&
              newCarsList.map((item: carType) => (
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
                    {cartItems[item.id] > 0 ? (
                      <div className=" w-full flex justify-between items-center">
                        <Button onClick={() => removeItemFromCart(item.id)}>
                          Remove
                        </Button>
                        <button
                          className="cursor-pointer hover:text-xl p-1"
                          onClick={() => decrementItemFromCart(item.id)}
                        >
                          <FaMinus />
                        </button>
                        {cartItems[item.id]}
                        <button
                          className="cursor-pointer hover:text-xl p-1"
                          onClick={() => addItemToCart(item.id)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => addItemToCart(item.id)}
                        className=" w-full"
                      >
                        Add to cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
        <Sheet>
          <SheetTrigger className="fixed right-10 p-2 top-12 z-50 hidden md:block">
            <div className="text-3xl text-white cursor-pointer hover:text-4xl transition-all">
              <FaCartPlus />
            </div>
          </SheetTrigger>
          <SheetContent className="hidden md:block overflow-y-scroll p-2 ">
            <SheetHeader>
              <SheetTitle className=" text-xl font-bold">My Cart</SheetTitle>
              <SheetDescription className=" flex flex-col gap-5 w-full text-center">
                Product will be shown here
              </SheetDescription>
            </SheetHeader>
            <div className="w-full flex flex-col gap-5">
              {Cars &&
                Cars.map((item: carType) => {
                  const { id, model, image, price } = item;
                  if (cartItems[id] > 0) {
                    return (
                      <div key={item.id}>
                        <Card
                          key={item.id}
                          className="grid p-4 grid-cols-4 place-items-center place-content-between w-full border gap-8"
                        >
                          <CardHeader className=" p-0">
                            <CardContent className="p-0">
                              <img className="w-full " src={image} alt="" />
                            </CardContent>
                          </CardHeader>
                          <CardTitle className="text-base flex flex-col justify-center">
                            <span className="text-sm">Products</span>
                            <span className=" break-keep">
                              {model.split(' ')}
                            </span>
                          </CardTitle>
                          <CardDescription className="flex flex-col justify-center">
                            <span>Price</span>
                            <span>${price}</span>
                          </CardDescription>
                          <CardFooter className="flex flex-col justify-center p-0">
                            <div>Quantity</div>
                            <div>x{cartItems[id]}</div>
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  }
                })}
              {value ? (
                <div>
                  <Button className=" w-full">Check Out</Button>
                </div>
              ) : (
                <div className=" w-full mx-20 mt-10">
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
