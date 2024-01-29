import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { memo, useContext } from "react";
import { ContextProvider } from "@/Store";
type Props = {
  id: number;
};

const CardFtr = ({ id }: Props) => {
  const {
    addItemToCart,
    cartItems,
    removeItemFromCart,
    decrementItemFromCart,
  } = useContext(ContextProvider);

  return (
    <CardFooter className="w-full px-5 py-3">
      {cartItems[id] > 0 ? (
        <div className="flex w-full items-center justify-between transition-all">
          <Button onClick={() => removeItemFromCart(id)}>Remove</Button>
          <button
            className="cursor-pointer p-1 hover:text-xl"
            onClick={() => decrementItemFromCart(id)}
          >
            <FaMinus />
          </button>
          {cartItems[id]}
          <button
            className="cursor-pointer p-1 hover:text-xl"
            onClick={() => addItemToCart(id)}
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <Button
          onClick={() => addItemToCart(id)}
          className="w-full transition-all"
        >
          Add to cart
        </Button>
      )}
    </CardFooter>
  );
};

export default memo(CardFtr);
