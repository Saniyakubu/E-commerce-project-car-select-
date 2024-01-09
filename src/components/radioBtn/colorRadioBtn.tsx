import { ContextProvider } from '@/Store';
import { useContext } from 'react';

const ColorRadioBtn = () => {
  const { Cars, filterRadioput } = useContext(ContextProvider);
  const colors: any = [
    'All',
    ...new Set(
      Cars.map((items: any) => {
        return items.color;
      })
    ),
  ];

  console.log(colors);
  // before:contents-[''] before:bg-black before:w-5 before:h-5 before:absolute relative before:top-0
  return (
    <>
      {colors.map((color: string) => (
        <label
          key={color}
          htmlFor={color}
          id={color}
          className=" p-1 font-bold capitalize flex"
        >
          <input
            onChange={(e) => filterRadioput(e.currentTarget.value)}
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
