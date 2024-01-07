import { createContext, useEffect } from 'react';
import { ReactNode } from 'react';
import Cars from '@/Db/Products';
import { useState } from 'react';

type childrenType = {
  children: ReactNode;
};

type carType = {
  id: number;
  model: string;
  category: string;
  color: string;
  price: number;
  company: string;
  image: string;
};

export const ContextProvider = createContext<any>('');

const CarsContextProvider = ({ children }: childrenType) => {
  const [inputValue, setInputValue] = useState('');
  //   const [carsList, setCarsList] = useState(Cars);
  const [newCarsList, setNewCarsList] = useState<[] | {}>(Cars);
  //   const [btnValue, setBtnValue] = useState(Cars);

  let Products = Cars;
  let filteredProduct: carType[];

  filteredProduct = Products.filter(
    (pname) =>
      pname.model.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
  );

  useEffect(() => {
    setNewCarsList(filteredProduct);
  }, [inputValue]);

  const filterdBtn = (val: string) => {
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

  const filterRadioput = (val: string) => {
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

  return (
    <ContextProvider.Provider
      value={{
        Cars,
        newCarsList,
        inputValue,
        setInputValue,
        filterdBtn,
        filterRadioput,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default CarsContextProvider;
