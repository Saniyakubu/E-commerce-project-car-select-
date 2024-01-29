import { CardTitle } from "../ui/card";

type Props = {
  carModal: string;
};

const CardTTle = ({ carModal }: Props) => {
  return <CardTitle className="m-0 px-5 ">Modal: {carModal}</CardTitle>;
};

export default CardTTle;
