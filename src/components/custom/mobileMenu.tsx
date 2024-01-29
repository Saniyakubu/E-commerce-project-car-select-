import { ContextProvider, carType } from "@/Store";
import { useContext, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { CgMenuRight } from "react-icons/cg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import axios from "axios";

const MobileMenu = () => {
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

  const totalPrice = totalAmount();
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

  return (
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
  );
};

export default MobileMenu;
