import { createContext, useEffect } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import axios from "axios";
// import Cars from "@/Db/Products";
type childrenType = {
  children: ReactNode;
};

type CartItems = {
  [key: string]: number;
};

export type carType = {
  _id: number;
  model: string;
  category: string;
  color: string;
  price: number;
  company: string;
  image: string;
};

interface contextShopType {
  filterCarsList: carType[];
  newCarsList: carType[];
  cartItems: CartItems;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  value: boolean;
  isLoading: boolean;
  filteredBtn: (val: string) => void;
  filteredRadioInput: (val: string) => void;
  addItemToCart: (itemId: number) => void;
  decrementItemFromCart: (itemId: number) => void;
  removeItemFromCart: (itemId: number) => void;
  totalAmount: () => number | undefined;
  Checkouts: (data: any) => Promise<void> | undefined;
}

const contextShopTypeDefault: contextShopType = {
  filterCarsList: [],
  newCarsList: [],
  cartItems: {},
  inputValue: "",
  value: false,
  isLoading: false,
  setInputValue: () => "",
  filteredBtn: () => null,
  filteredRadioInput: () => null,
  addItemToCart: () => null,
  decrementItemFromCart: () => null,
  removeItemFromCart: () => null,
  totalAmount: () => undefined,
  Checkouts: () => undefined,
};

type responseType = {
  data: {
    success: boolean;
    products: carType[];
  };
};

type productPrice = {
  _id: number;
  model: string;
  category: string;
  color: string;
  price: number;
  company: string;
  image: string;
};

type checkoutType = { data: { success: boolean; link: string } };

export const ContextProvider = createContext<contextShopType>(
  contextShopTypeDefault,
);

const CarsContextProvider = ({ children }: childrenType) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [newCarsList, setNewCarsList] = useState<carType[]>([]);
  const [filterCarsList, setFilterCarsList] = useState<carType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res: responseType = await axios.get(
        "http://localhost:2000/products",
      );
      console.log(res);
      const resData: carType[] = res?.data.products;
      setNewCarsList(resData);
      setFilterCarsList(resData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const Checkouts = async (data: checkoutType): Promise<void> => {
    try {
      setIsLoading(true);
      const res: checkoutType = await axios.post(
        "http://localhost:2000/checkout",
        data,
      );
      console.log(res);
      const resData: string = res?.data.link;
      console.log(resData);
      setIsLoading(false);
      if (resData) {
        window.location.href = resData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const value: boolean = Object.values(cartItems).some(
    (val: number) => val > 0,
  );

  let Products = filterCarsList;
  let filteredProduct: carType[];

  filteredProduct = Products?.filter(
    (pname) =>
      pname.model.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1,
  );

  useEffect(() => {
    setNewCarsList(filteredProduct);
  }, [inputValue]);

  const filteredBtn = (val: string) => {
    filteredProduct = filterCarsList;
    if (val === "All") {
      setNewCarsList(filterCarsList);
    } else {
      filteredProduct = filteredProduct?.filter(
        (pname) => pname.category === val,
      );
      setNewCarsList(filteredProduct);
    }
  };

  const filteredRadioInput = (val: string) => {
    filteredProduct = filterCarsList;

    if (val === "All") {
      setNewCarsList(filterCarsList);
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
        pname.price.toString().toLowerCase() === val.toLowerCase(),
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
        const itemInfo: carType | undefined = newCarsList?.find(
          (product: productPrice) => String(product._id) === keys,
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
    filterCarsList,
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
    isLoading,
    totalAmount,
    Checkouts,
  };

  return (
    <ContextProvider.Provider value={contextShop}>
      {children}
    </ContextProvider.Provider>
  );
};

export default CarsContextProvider;
