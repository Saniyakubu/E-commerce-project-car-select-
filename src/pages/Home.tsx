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
const HomePage = () => {
  const { newCarsList } = useContext(ContextProvider);

  return (
    <section className="flex relative h-full">
      <aside className="fixed left-0 top-32 bottom-0 p-5 w-60 border-r-2 flex flex-col overflow-y-auto">
        <section className="flex flex-col gap-5 p-5">
          <div>
            <h1>{'title'}</h1>
          </div>
          <RadioButton id={'12'} name="color" value={'Silver'} />
          <RadioButton id={'12'} name="color" value={'black'} />
          <RadioButton id={'12'} name="color" value={'red'} />
          <RadioButton id={'12'} name="color" value={'purple'} />
          <RadioButton id={'12'} name="color" value={'blue'} />
        </section>

        <section className="flex flex-col gap-5 p-5 ml-10">
          <div>
            <h1>{'title'}</h1>
          </div>
          <RadioButton id={'12'} name={'Category'} value={'Ford'} />
          <RadioButton id={'12'} name={'Category'} value={'Honda'} />
          <RadioButton id={'12'} name={'Category'} value={'Toyota'} />
          <RadioButton id={'12'} name={'Category'} value={'All'} />
          <RadioButton id={'12'} name={'Category'} value={'Category'} />
        </section>
        <section className="flex flex-col gap-5 p-5">
          <div>
            <h1>{'title'}</h1>
          </div>
          <RadioButton id={'12'} name={'price'} value={'200'} />
          <RadioButton id={'12'} name={'price'} value={'43000'} />
          <RadioButton id={'12'} name={'price'} value={'2500'} />
          <RadioButton id={'12'} name={'price'} value={'1000'} />
          <RadioButton id={'12'} name={'price'} value={'1500'} />
        </section>
      </aside>

      <div className="w-5/6 border mt-40  ml-80 border-red-500 h-full">
        <div className="flex p-5 items-center justify-center w-2/3 mx-auto border">
          <Btn />
        </div>
        <div className=" w-full flex flex-wrap h-full p-10 gap-5 justify-between items-center">
          {newCarsList &&
            newCarsList.map((item: any) => (
              <Card key={item.id} className="w-1/4 h-96">
                <CardHeader>
                  <CardContent className=" border w-full">
                    <img className="w-full" src={item.image} alt="" />
                  </CardContent>
                </CardHeader>
                <CardTitle>Modal: {item.model}</CardTitle>
                <CardDescription>
                  Company: {item.company}
                  <br />
                  Price: {item.price}
                  <br />
                  Category: {item.category}
                </CardDescription>
                <CardFooter>
                  <Button>Add to cart</Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
