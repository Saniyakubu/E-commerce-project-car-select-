import { CardContent, CardHeader } from "../ui/card";

type Props = {
  image: string;
};

const CardHeading = ({ image }: Props) => {
  return (
    <CardHeader>
      <CardContent className="w-full p-0">
        <img loading="lazy" className="w-full" src={image} alt="" />
      </CardContent>
    </CardHeader>
  );
};

export default CardHeading;
