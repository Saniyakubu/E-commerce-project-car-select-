import { ContextProvider, carType } from '@/Store';
import { useContext } from 'react';

const RadioButton = () => {
  const { Cars, filteredRadioInput } = useContext(ContextProvider);

  const company: string[] = [
    'All',
    ...new Set<string>(
      Cars?.map((items: carType) => {
        return items.company;
      })
    ),
  ];

  return (
    <>
      {company?.map((company: string) => (
        <label
          key={company}
          htmlFor={company}
          id={company}
          className=" p-1 font-bold capitalize flex"
        >
          <input
            onChange={(e) => filteredRadioInput(e.currentTarget.value)}
            className="mr-2 w-5 h-5 cursor-pointer"
            type="radio"
            name={'company'}
            value={company}
            id={company}
          />
          {company}
        </label>
      ))}
    </>
  );
};

export default RadioButton;
