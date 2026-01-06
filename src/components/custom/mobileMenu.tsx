import { ContextProvider, carType } from "@/Store";
import { useContext, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { FiShoppingCart, FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import axios from "axios";

const MobileMenu = () => {
  const {
    filterCarsList,
    cartItems,
    value,
    totalAmount,
    Checkouts,
    isLoading,
    setIsLoading,
    cartCount,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
  } = useContext(ContextProvider);

  const totalPrice = totalAmount();
  const [user, setUser] = useState<string | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.get("https://carlists.onrender.com/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger className="fixed bottom-6 right-6 z-40 block md:hidden">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-xl">
          <FiShoppingCart className="h-6 w-6 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </div>
      </DrawerTrigger>

      <DrawerContent className="z-50 block bg-card md:hidden">
        <div className="mx-auto w-full max-w-lg pb-6">
          <DrawerHeader className="flex items-center justify-between border-b border-border px-4 pb-4">
            <DrawerTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
              <FiShoppingCart className="h-5 w-5" />
              Your Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </DrawerTitle>
            <DrawerClose asChild>
              <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary">
                <FiX className="h-5 w-5" />
              </button>
            </DrawerClose>
          </DrawerHeader>

          <div className="max-h-[40vh] overflow-y-auto px-4 pt-4">
            {value ? (
              <div className="space-y-3">
                {filterCarsList.map((item: carType) => {
                  const { _id, model, image, price, company } = item;
                  const quantity = cartItems[_id];
                  if (quantity > 0) {
                    return (
                      <div
                        key={_id}
                        className="flex gap-3 rounded-xl border border-border bg-secondary/30 p-3"
                      >
                        <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <img
                            src={image}
                            alt={model}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="text-xs font-medium text-primary">{company}</p>
                            <p className="text-sm font-semibold text-foreground">{model}</p>
                            <p className="text-sm font-medium text-foreground">
                              ${price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-lg border border-border bg-card">
                              <button
                                onClick={() => decrementItemFromCart(_id)}
                                className="flex h-7 w-7 items-center justify-center text-muted-foreground"
                              >
                                <FiMinus className="h-3 w-3" />
                              </button>
                              <span className="w-4 text-center text-xs font-medium">{quantity}</span>
                              <button
                                onClick={() => addItemToCart(_id)}
                                className="flex h-7 w-7 items-center justify-center text-muted-foreground"
                              >
                                <FiPlus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItemFromCart(_id)}
                              className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground hover:text-destructive"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                  <FiShoppingCart className="h-7 w-7 text-muted-foreground" />
                </div>
                <p className="mt-3 font-medium text-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add some cars to get started</p>
              </div>
            )}
          </div>

          {value && (
            <div className="mt-4 border-t border-border px-4 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-muted-foreground">Total</p>
                <p className="text-xl font-bold text-foreground">
                  ${totalPrice?.toLocaleString()}
                </p>
              </div>
              <button
                disabled={isLoading}
                onClick={() => Checkouts({ cartItems: { ...cartItems } })}
                className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Checkout"}
              </button>
            </div>
          )}

          {user && (
            <div className="mt-4 border-t border-border px-4 pt-4">
              <button
                disabled={isLoading}
                onClick={logout}
                className="w-full rounded-xl border border-border py-3 text-sm font-medium text-foreground"
              >
                {isLoading ? "..." : "Log out"}
              </button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
