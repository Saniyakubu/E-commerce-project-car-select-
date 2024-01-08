import { ContextProvider } from '@/Store';
import Btn from '@/components/Button/Btn';
import RadioButton from '@/components/radioBtn/radio';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ColorRadioBtn from '@/components/radioBtn/colorRadioBtn';
import '../App.css';
const HomePage = () => {
  const { newCarsList, addItemToCart } = useContext(ContextProvider);

  return (
    <section className="flex relative h-full">
      <aside className="fixed p-10 left-0 top-32 bottom-0 w-60 border-r-2 flex flex-col items-center overflow-y-auto">
        <section className="flex w-full flex-col gap-5 mb-5">
          <div>
            <h1 className="text-xl font-bold">{'Colors'}</h1>
          </div>
          <ColorRadioBtn />
        </section>

        <section className="flex w-full flex-col gap-5">
          <div>
            <h1 className=" text-xl font-bold">{'Company'}</h1>
          </div>
          <RadioButton />
        </section>
      </aside>
      <div className="w-5/6 border mt-40  ml-80 border-red-500 h-full">
        <div className="flex p-5 items-center justify-center w-2/3 mx-auto border">
          <Btn />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2  2xl:grid-cols-3 h-full p-10 gap-5">
          {newCarsList &&
            newCarsList.map((item: any) => (
              <Card key={item.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardContent className="border w-full p-0">
                    <img className="w-full" src={item.image} alt="" />
                  </CardContent>
                </CardHeader>
                <CardTitle className=" px-5 border m-0">
                  Modal: {item.model}
                </CardTitle>
                <CardDescription className="px-5 my-2">
                  Company: {item.company}
                  <br />
                  Price: ${item.price}
                  <br />
                  Category: {item.category}
                </CardDescription>
                <CardFooter className="py-3 px-5 w-full border">
                  <Button
                    onClick={() => addItemToCart(item.id)}
                    className=" w-full"
                  >
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
