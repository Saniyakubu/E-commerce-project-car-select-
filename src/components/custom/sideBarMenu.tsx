import { ContextProvider, carType } from "@/Store";
import { FaCartPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { memo, useContext } from "react";

const SideBarMenu = () => {
  const {
    filterCarsList,
    cartItems,
    value,
    Checkouts,
    isLoading,
    totalAmount,
  } = useContext(ContextProvider);

  const totalPrice = totalAmount();
  return (
    <Sheet>
      <SheetTrigger className="fixed right-10 top-12 z-50 hidden p-2 md:block">
        <div className="cursor-pointer text-3xl text-white transition-all hover:text-4xl">
          <FaCartPlus />
        </div>
      </SheetTrigger>
      <SheetContent className="hidden overflow-x-hidden overflow-y-scroll p-2 md:block ">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold ">My Cart</SheetTitle>
          <SheetDescription className="flex w-full flex-col gap-5 text-center ">
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
                      <CardHeader className="p-0 ">
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
              <div className="w-full p-5 text-end">
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
                className="w-full "
              >
                {isLoading ? "Loading..." : " Check Out"}
              </Button>
            </div>
          ) : (
            <div className="mx-20 mt-10 w-full ">
              <div className="text-2xl font-bold ">Your Cart Is Empty</div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default memo(SideBarMenu);
