import { CardDescription } from "../ui/card";

type Props = {
  company: string;
  price: number;
  category: string;
};

const CardDesc = ({ company, price, category }: Props) => {
  return (
    <CardDescription className="my-2 px-5">
      Company: {company}
      <br />
      Price: ${price}
      <br />
      Category: {category}
    </CardDescription>
  );
};

export default CardDesc;
