import {
  createContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useCars from "@/hooks/useCars";
import { Car } from "@/types/car";

type childrenType = {
  children: ReactNode;
};

type CartItems = {
  [key: string]: number;
};

type Filters = {
  category: string;
  company: string;
  color: string;
};

type checkoutType = { data: { success: boolean; link: string } };

export type carType = Car;

interface contextShopType {
  filterCarsList: Car[];
  newCarsList: Car[];
  cartItems: CartItems;
  cartCount: number;
  isError: string | null;
  setIsError: React.Dispatch<React.SetStateAction<string | null>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  filters: Filters;
  updateFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;
  value: boolean;
  isLoading: boolean;
  checkoutLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  addItemToCart: (itemId: number) => void;
  decrementItemFromCart: (itemId: number) => void;
  removeItemFromCart: (itemId: number) => void;
  clearCart: () => void;
  totalAmount: () => number | undefined;
  Checkouts: (data: any) => Promise<void> | undefined;
  // Auth modal control
  authModalOpen: boolean;
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAuthModal: () => void;
}

const contextShopTypeDefault: contextShopType = {
  filterCarsList: [],
  newCarsList: [],
  cartItems: {},
  cartCount: 0,
  inputValue: "",
  filters: { category: "All", company: "All", color: "All" },
  value: false,
  isLoading: false,
  checkoutLoading: false,
  isError: null,
  setIsError: () => null,
  setIsLoading: () => undefined,
  setInputValue: () => "",
  updateFilter: () => null,
  resetFilters: () => null,
  addItemToCart: () => null,
  decrementItemFromCart: () => null,
  removeItemFromCart: () => null,
  clearCart: () => null,
  totalAmount: () => undefined,
  Checkouts: () => undefined,
  authModalOpen: false,
  setAuthModalOpen: () => null,
  openAuthModal: () => null,
};

export const ContextProvider = createContext<contextShopType>(
  contextShopTypeDefault,
);

const CarsContextProvider = ({ children }: childrenType) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    company: "All",
    color: "All",
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const { data: cars = [], isPending: isCarsLoading, error } = useCars();

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ category: "All", company: "All", color: "All" });
    setInputValue("");
  }, []);

  const openAuthModal = useCallback(() => {
    setAuthModalOpen(true);
  }, []);

  const filterCarsList = useMemo<Car[]>(() => {
    return cars ?? [];
  }, [cars]);

  const newCarsList = useMemo<Car[]>(() => {
    let filtered = [...filterCarsList];

    if (filters.category !== "All") {
      filtered = filtered.filter(
        (car) => car.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }
    if (filters.company !== "All") {
      filtered = filtered.filter(
        (car) => car.company.toLowerCase() === filters.company.toLowerCase(),
      );
    }
    if (filters.color !== "All") {
      filtered = filtered.filter(
        (car) => car.color.toLowerCase() === filters.color.toLowerCase(),
      );
    }
    if (inputValue.trim()) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(inputValue.toLowerCase()),
      );
    }
    return filtered;
  }, [filterCarsList, filters, inputValue]);

  const isLoading = actionLoading || isCarsLoading;

  const value: boolean = Object.values(cartItems).some(
    (val: number) => val > 0,
  );

  const addItemToCart = (itemId: number): void => {
    setCartItems((prev: CartItems) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const decrementItemFromCart = (itemId: number): void => {
    if (!cartItems[itemId]) {
      return;
    }
    setCartItems((prev: CartItems) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));
  };

  const removeItemFromCart = (itemId: number): void => {
    if (cartItems[itemId]) {
      setCartItems((prev: CartItems) => ({ ...prev, [itemId]: 0 }));
    }
  };

  const clearCart = (): void => {
    setCartItems({});
  };

  const cartCount = useMemo(() => {
    return Object.values(cartItems).reduce(
      (sum, qty) => sum + (qty > 0 ? qty : 0),
      0,
    );
  }, [cartItems]);

  const totalAmount = (): number | undefined => {
    let productsPrice = 0;
    for (const keys in cartItems) {
      if (cartItems[keys] > 0) {
        const itemInfo: Car | undefined = filterCarsList?.find(
          (product: Car) => String(product._id) === keys,
        );
        if (itemInfo) {
          productsPrice += cartItems[keys] * itemInfo?.price;
        }
      }
    }
    return productsPrice;
  };

  const Checkouts = async (data: checkoutType): Promise<void> => {
    try {
      setActionLoading(true);
      setCheckoutLoading(true);
      const res: checkoutType | AxiosResponse = await axios.post(
        "https://carlists.onrender.com/checkout",
        data,
        {
          withCredentials: true,
        },
      );
      if ((res as any).data?.Msg === "Unauthorized") {
        setActionLoading(false);
        setCheckoutLoading(false);
        toast.error("Please log in to checkout");
        // Open auth modal after a short delay so user sees the toast first
        setTimeout(() => {
          setAuthModalOpen(true);
        }, 500);
        return;
      }
      const resData: string = (res as any)?.data?.link;

      // Don't set loading to false here - keep showing loader until redirect
      if (resData) {
        // Keep the loader visible while redirecting
        window.location.href = resData;
      } else {
        setActionLoading(false);
        setCheckoutLoading(false);
      }
    } catch (error: any) {
      setActionLoading(false);
      setCheckoutLoading(false);
      toast.error(error?.message ?? "Something went wrong");
    }
  };

  const contextShop: contextShopType = {
    isError: isError ?? error?.message ?? null,
    setIsError,
    filterCarsList,
    newCarsList,
    inputValue,
    setInputValue,
    filters,
    updateFilter,
    resetFilters,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
    clearCart,
    cartItems,
    cartCount,
    value,
    isLoading,
    checkoutLoading,
    setIsLoading: setActionLoading,
    totalAmount,
    Checkouts,
    authModalOpen,
    setAuthModalOpen,
    openAuthModal,
  };

  return (
    <ContextProvider.Provider value={contextShop}>
      {children}
    </ContextProvider.Provider>
  );
};

export default CarsContextProvider;
