import { ContextProvider, carType } from "@/Store";
import { useContext } from "react";

const RadioButton = () => {
  const { filterCarsList, filteredRadioInput } = useContext(ContextProvider);

  const company: string[] = [
    "All",
    ...new Set<string>(
      filterCarsList?.map((items: carType) => {
        return items.company;
      }),
    ),
  ];

  return (
    <>
      {company?.map((company: string) => (
        <label
          key={company}
          htmlFor={company}
          id={company}
          className="flex p-1 font-bold capitalize"
        >
          <input
            onChange={(e) => filteredRadioInput(e.currentTarget.value)}
            className="mr-2 h-5 w-5 cursor-pointer"
            type="radio"
            name={"company"}
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
