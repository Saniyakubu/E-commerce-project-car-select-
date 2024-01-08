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

  return (
    <>
      {colors.map((color: string) => (
        <label key={color} htmlFor={color} id={color}>
          <input
            onChange={(e) => filterRadioput(e.currentTarget.value)}
            className="mr-2"
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
