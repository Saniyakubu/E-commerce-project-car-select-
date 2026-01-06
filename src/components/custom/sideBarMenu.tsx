import { ContextProvider, carType } from "@/Store";
import { FiShoppingCart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
    cartCount,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
  } = useContext(ContextProvider);

  const totalPrice = totalAmount();

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-6 right-6 z-40 hidden md:flex">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card shadow-xl transition-all hover:border-primary hover:shadow-2xl">
          <FiShoppingCart className="h-6 w-6 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full max-w-md flex-col border-l border-border bg-card p-0 md:flex">
        <SheetHeader className="shrink-0 border-b border-border p-6">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
            <FiShoppingCart className="h-5 w-5" />
            Your Cart
            {cartCount > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {cartCount}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {value ? (
            <div className="space-y-4">
              {filterCarsList.map((item: carType) => {
                const { _id, model, image, price, company } = item;
                const quantity = cartItems[_id];
                if (quantity > 0) {
                  return (
                    <div
                      key={_id}
                      className="flex gap-4 rounded-xl border border-border bg-secondary/30 p-4"
                    >
                      <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <img
                          src={image}
                          alt={model}
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-xs font-medium text-primary">{company}</p>
                          <p className="font-semibold text-foreground">{model}</p>
                          <p className="text-sm font-medium text-foreground">
                            ${price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-border bg-card">
                            <button
                              onClick={() => decrementItemFromCart(_id)}
                              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <FiMinus className="h-3 w-3" />
                            </button>
                            <span className="w-4 text-center text-sm font-medium">{quantity}</span>
                            <button
                              onClick={() => addItemToCart(_id)}
                              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            >
                              <FiPlus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItemFromCart(_id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
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
            <div className="flex h-full flex-col items-center justify-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <FiShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-4 font-medium text-foreground">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add some cars to get started
              </p>
            </div>
          )}
        </div>

        {value && (
          <div className="shrink-0 border-t border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-foreground">
                ${totalPrice?.toLocaleString()}
              </p>
            </div>
            <button
              disabled={isLoading}
              onClick={() => Checkouts({ cartItems: { ...cartItems } })}
              className="w-full rounded-xl bg-primary py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default memo(SideBarMenu);
