import { Card } from "../ui/card";
import { carType } from "@/Store";
import { memo } from "react";
import CardHeading from "./cardHeader";
import CardTTle from "./cardTitle";
import CardDesc from "./cardDesc";
import CardFtr from "./cardFooter";

type Props = {
  item: carType;
};

const CarCard = ({ item }: Props) => {
  return (
    <Card key={item._id} className="flex w-full flex-col justify-between">
      <CardHeading image={item.image} />
      <CardTTle carModal={item.model} />
      <CardDesc
        company={item.company}
        price={item.price}
        category={item.category}
      />
      <CardFtr id={item._id} />
    </Card>
  );
};

export default memo(CarCard);

// function useContext(ContextProvider: any): {
//   filterCarsList: any;
//   newCarsList: any;
//   addItemToCart: any;
//   cartItems: any;
//   removeItemFromCart: any;
//   decrementItemFromCart: any;
//   value: any;
//   totalAmount: any;
//   Checkouts: any;
//   isLoading: any;
//   setIsLoading: any;
// } {
//   throw new Error("Function not implemented.");
// }
