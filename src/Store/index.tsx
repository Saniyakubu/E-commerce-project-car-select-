import { createContext, useEffect } from 'react';
import { ReactNode } from 'react';
import Cars from '@/Db/Products';
import { useState } from 'react';

type childrenType = {
  children: ReactNode;
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

// type cartItem = {
//   [number]: number;
// };

export const ContextProvider = createContext<any>('');

const CarsContextProvider = ({ children }: childrenType) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [cartItems, setCartItems] = useState<any>({});
  const [newCarsList, setNewCarsList] = useState<carType[]>(Cars);

  const value = Object.values(cartItems).some((val: any) => val > 0);
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
    if (val === 'All') {
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

    if (val === 'All') {
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
      setCartItems((prev: any) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev: any) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const decrementItemFromCart = (itemId: number): void => {
    if (!cartItems[itemId]) {
      setCartItems((prev: any) => ({ ...prev, [itemId]: 0 }));
    } else {
      setCartItems((prev: any) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const removeItemFromCart = (itemId: number): void => {
    if (cartItems[itemId]) {
      setCartItems((prev: any) => ({ ...prev, [itemId]: 0 }));
    }
  };

  return (
    <ContextProvider.Provider
      value={{
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
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default CarsContextProvider;
