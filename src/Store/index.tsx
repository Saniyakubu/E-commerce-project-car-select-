import { createContext, useEffect } from "react";
import { ReactNode } from "react";
import Cars from "@/Db/Products";
import { useState } from "react";

type childrenType = {
  children: ReactNode;
};

type CartItems = {
  [key: string]: number;
};

export type carType = {
  id: number;
  model: string;
  category: string;
  color: string;
  price: number;
  company: string;
  image: string;
};

interface contextShopType {
  Cars: carType[];
  newCarsList: carType[];
  cartItems: CartItems;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  value: boolean;
  filteredBtn: (val: string) => void;
  filteredRadioInput: (val: string) => void;
  addItemToCart: (itemId: number) => void;
  decrementItemFromCart: (itemId: number) => void;
  removeItemFromCart: (itemId: number) => void;
  totalAmount: () => number | undefined;
}

const contextShopTypeDefault: contextShopType = {
  Cars: [],
  newCarsList: [],
  cartItems: {},
  inputValue: "",
  value: false,
  setInputValue: () => "",
  filteredBtn: () => null,
  filteredRadioInput: () => null,
  addItemToCart: () => null,
  decrementItemFromCart: () => null,
  removeItemFromCart: () => null,
  totalAmount: () => undefined,
};

type productPrice = {
  id: number;
  model: string;
  category: string;
  color: string;
  price: number;
  company: string;
  image: string;
};

export const ContextProvider = createContext<contextShopType>(
  contextShopTypeDefault
);

const CarsContextProvider = ({ children }: childrenType) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItems>({});

  const [newCarsList, setNewCarsList] = useState<carType[]>(Cars);

  const value: boolean = Object.values(cartItems).some(
    (val: number) => val > 0
  );

  let Products = Cars;
  let filteredProduct: carType[];

  filteredProduct = Products.filter(
    (pname) =>
      pname.model.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
  );

  useEffect(() => {
    setNewCarsList(filteredProduct);
  }, [inputValue]);

  const filteredBtn = (val: string) => {
    filteredProduct = Cars;
    if (val === "All") {
      setNewCarsList(Cars);
    } else {
      filteredProduct = filteredProduct.filter(
        (pname) => pname.category === val
      );
      setNewCarsList(filteredProduct);
    }
  };

  const filteredRadioInput = (val: string) => {
    filteredProduct = Cars;

    if (val === "All") {
      setNewCarsList(Cars);
      return;
    }

    if (inputValue) {
      filteredProduct = filteredProduct;
    }

    filteredProduct = filteredProduct.filter(
      (pname) =>
        pname.company.toLowerCase() === val.toLowerCase() ||
        pname.company.toLowerCase() === val.toLowerCase() ||
        pname.color.toLowerCase() === val.toLowerCase() ||
        pname.price.toString().toLowerCase() === val.toLowerCase()
    );
    if (filteredProduct) {
      setNewCarsList(filteredProduct);
    }
  };

  const addItemToCart = (itemId: number): void => {
    if (!cartItems[itemId]) {
      setCartItems((prev: CartItems) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev: CartItems) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
  };

  const decrementItemFromCart = (itemId: number): void => {
    if (!cartItems[itemId]) {
      setCartItems((prev: CartItems) => ({ ...prev, [itemId]: 0 }));
    } else {
      setCartItems((prev: CartItems) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
  };

  const removeItemFromCart = (itemId: number): void => {
    if (cartItems[itemId]) {
      setCartItems((prev: CartItems) => ({ ...prev, [itemId]: 0 }));
    }
  };

  const totalAmount = (): number | undefined => {
    let productsPrice = 0;
    for (const keys in cartItems) {
      if (cartItems[keys] > 0) {
        const itemInfo: carType | undefined = newCarsList.find(
          (product: productPrice) => product.id === +keys
        );
        console.log(itemInfo);
        if (itemInfo) {
          productsPrice += cartItems[keys] * itemInfo?.price;
        }
      }
    }
    return productsPrice;
  };

  const contextShop: contextShopType = {
    Cars,
    newCarsList,
    inputValue,
    setInputValue,
    filteredBtn,
    filteredRadioInput,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
    cartItems,
    value,
    totalAmount,
  };

  return (
    <ContextProvider.Provider value={contextShop}>
      {children}
    </ContextProvider.Provider>
  );
};

export default CarsContextProvider;
