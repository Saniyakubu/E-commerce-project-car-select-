import { ContextProvider } from '@/Store';
import { useContext } from 'react';

type Props = {
  id?: string | undefined;
  value: string;
  name: string;
};

const RadioButton = (props: Props) => {
  const { filterRadioput } = useContext(ContextProvider);
  const { name, id, value } = props;
  return (
    <>
      <label htmlFor={name} id={id}>
        <input
          onChange={(e) => filterRadioput(e.currentTarget.value)}
          className="mr-2"
          type="radio"
          name={name}
          value={value}
          id={id && id}
        />
        {value}
      </label>
    </>
  );
};

export default RadioButton;
