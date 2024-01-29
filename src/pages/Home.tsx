import { ContextProvider } from "@/Store";
import Btn from "@/components/Button/Btn";
import RadioButton from "@/components/radioBtn/radio";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CgMenuRight } from "react-icons/cg";
import ColorRadioBtn from "@/components/radioBtn/colorRadioBtn";

import {
  Card,
  CardContent,
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
import "react-toastify/dist/ReactToastify.css";
import { carType } from "@/Store";
import Navbar from "@/components/nav/Navbar";
import axios from "axios";
import CarCard from "@/components/custom/carCard";
import { SkeletonLoadingUi } from "@/components/custom/skeletonLoading";
import SideBarMenu from "@/components/custom/sideBarMenu";

const HomePage = () => {
  const {
    filterCarsList,
    newCarsList,
    cartItems,
    value,
    totalAmount,
    Checkouts,
    isLoading,
    setIsLoading,
  } = useContext(ContextProvider);
  const [user, isUser] = useState(
    JSON.parse(localStorage.getItem("user") as string) || null,
  );

  useEffect(() => {
    isUser(localStorage.getItem("user") as string);
  }, [user]);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.get("https://carlists.onrender.com/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      setIsLoading(false);
      isUser(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const totalPrice = totalAmount();

  return (
    <>
      <Navbar />
      <div className="glass fixed top-40 z-20 grid w-full grid-cols-3 p-2 md:right-0 md:top-36 md:w-2/3 md:grid-cols-5 lg:w-3/4 xl:w-10/12">
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
              <h1 className="text-xl font-bold ">{"Company"}</h1>
            </div>
            <RadioButton />
          </section>
        </aside>
        <Drawer>
          <DrawerTrigger className="fixed bottom-0 right-0 top-7 z-50 block h-fit text-end md:hidden">
            <Button className=" bg-Dark hover:text-black">
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
                          <CardHeader className="w-full flex-1 p-0 ">
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
                    <Button
                      onClick={() =>
                        Checkouts({
                          cartItems: {
                            ...cartItems,
                          },
                        })
                      }
                      className="w-full "
                    >
                      {isLoading ? "Loading..." : " Check Out"}
                    </Button>
                  </div>
                ) : (
                  <div className="mx-20 mt-10 w-full ">
                    <h1 className="text-2xl font-bold ">Your Cart Is Empty</h1>
                  </div>
                )}
                <DrawerClose asChild>
                  <Button variant="outline">Close Cart</Button>
                </DrawerClose>
                {user && (
                  <Button disabled={isLoading && isLoading} onClick={logout}>
                    {isLoading ? "Loading..." : "Log Out"}
                  </Button>
                )}
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="mt-96 h-full w-full md:ml-64 md:mt-72 md:w-3/4 xl:w-full">
          {isLoading ? (
            <SkeletonLoadingUi />
          ) : (
            <div className="grid h-full w-full grid-cols-1 gap-5 p-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {newCarsList &&
                newCarsList.map((item: carType) => (
                  <CarCard key={item._id} item={item} />
                ))}
            </div>
          )}
        </div>
        <SideBarMenu />
      </section>
    </>
  );
};

export default HomePage;
