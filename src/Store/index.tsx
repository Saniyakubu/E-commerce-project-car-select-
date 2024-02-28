import { createContext, useCallback, useEffect } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { string } from "zod";
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
  isError: string | null;
  setIsError: React.Dispatch<React.SetStateAction<string | null>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  value: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  isError: null,
  setIsError: () => null,
  setIsLoading: () => Boolean,
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
  const [isError, setIsError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res: responseType = await axios.get(
        "https://carlists.onrender.com/products",
      );

      const resData: carType[] = res?.data?.products;
      setNewCarsList(resData);
      setFilterCarsList(resData);
      setIsLoading(false);
    } catch (error) {
      const err = error as Error;
      setIsLoading(false);
      setIsError(err.message);
    }
  };
  // const { toast } = useToast();
  const Checkouts = async (data: checkoutType): Promise<void> => {
    try {
      setIsLoading(true);
      const res: checkoutType | AxiosResponse = await axios.post(
        "https://carlists.onrender.com/checkout",
        data,
        {
          withCredentials: true,
        },
      );
      if (res.data.Msg === "Unauthorized") {
        setIsLoading(false);
        toast.error("your not logged in", {
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/login");
        }, 800);
        return;
      }
      const resData: string = res?.data?.link;

      setIsLoading(false);
      if (resData) {
        window.location.href = resData;
      }
    } catch (error) {
      setIsLoading(false);
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

  const filteredBtn = useCallback(
    (val: string) => {
      filteredProduct = filterCarsList;
      if (val === "All") {
        setNewCarsList(filterCarsList);
      } else {
        filteredProduct = filteredProduct?.filter(
          (pname) => pname.category === val,
        );
        setNewCarsList(filteredProduct);
      }
    },
    [newCarsList],
  );

  const filteredRadioInput = (val: string) => {
    filteredProduct = filterCarsList;

    if (val === "All") {
      setNewCarsList(filterCarsList);
      return;
    }

    // if (inputValue) {
    //   filteredProduct = filteredProduct;
    // }

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
    isError,
    setIsError,
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
    setIsLoading,
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
