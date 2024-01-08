import { ContextProvider } from '@/Store';
import { useContext } from 'react';

const RadioButton = () => {
  const { Cars, filterRadioput } = useContext(ContextProvider);

  const company: any = [
    'All',
    ...new Set(
      Cars.map((items: any) => {
        return items.company;
      })
    ),
  ];

  console.log(company);

  return (
    <>
      {company.map((company: string) => (
        <label key={company} htmlFor={company} id={company}>
          <input
            onChange={(e) => filterRadioput(e.currentTarget.value)}
            className="mr-2"
            type="radio"
            name={'company'}
            value={company}
            id={'company'}
          />
          {company}
        </label>
      ))}
    </>
  );
};

export default RadioButton;
