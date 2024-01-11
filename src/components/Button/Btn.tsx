import { ContextProvider, carType } from '@/Store';
import { Button } from '../ui/button';
import { useContext } from 'react';

// type Props = {
//   title: string;
// };

const Btn = () => {
  const { filteredBtn, Cars } = useContext(ContextProvider);

  const addNewBtn: string[] = [
    'All',
    ...new Set<string>(
      Cars.map((items: carType) => {
        return items.category;
      })
    ),
  ];

  return (
    <>
      {addNewBtn.map((L: any, index) => {
        return (
          <Button
            className="text-base"
            style={{ margin: '5px' }}
            key={index}
            onClick={(event) => filteredBtn(event.currentTarget.value)}
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
