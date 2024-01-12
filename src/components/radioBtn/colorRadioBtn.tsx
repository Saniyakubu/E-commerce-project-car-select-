import { ContextProvider } from '@/Store';
import { useContext } from 'react';
import { carType } from '@/Store';
const ColorRadioBtn = () => {
  const { Cars, filteredRadioInput } = useContext(ContextProvider);
  const colors: string[] = [
    'All',
    ...new Set<string>(
      Cars?.map((items: carType) => {
        return items.color;
      })
    ),
  ];

  // before:contents-[''] before:bg-black before:w-5 before:h-5 before:absolute relative before:top-0
  return (
    <>
      {colors?.map((color: string) => (
        <label
          key={color}
          htmlFor={color}
          id={color}
          className=" p-1 font-bold capitalize flex"
        >
          <input
            onChange={(e) => filteredRadioInput(e.currentTarget.value)}
            className="mr-2 w-5 h-5 cursor-pointer"
            type="radio"
            name={'colors'}
            value={color}
            id={color}
          />
          {color}
        </label>
      ))}
    </>
  );
};

export default ColorRadioBtn;
