import { ContextProvider } from '@/Store';
import { Button } from '../ui/button';
import { useContext, useEffect, useState } from 'react';

// type Props = {
//   title: string;
// };

const Btn = () => {
  const { filterdBtn, newCarsList, Cars } = useContext(ContextProvider);

  const [Btn, setBtn] = useState([]);

  const addNewBtn: any = [
    'All',
    ...new Set(
      Cars.map((items: any) => {
        return items.category;
      })
    ),
  ];
  useEffect(() => {
    setBtn(addNewBtn);
  }, [newCarsList, filterdBtn]);
  // setNewBtn(categoryList);

  return (
    <>
      {Btn.map((L: any, index) => {
        return (
          <Button
            className="text-base"
            style={{ margin: '5px' }}
            key={index}
            onClick={(event) => filterdBtn(event.currentTarget.value)}
            value={L}
          >
            {L}
          </Button>
        );
      })}
    </>
  );
};

export default Btn;
