import { ContextProvider, carType } from "@/Store";
import { Button } from "../ui/button";
import { useContext } from "react";

const Btn = () => {
  const { filteredBtn, filterCarsList } = useContext(ContextProvider);

  const addNewBtn: string[] = [
    "All",
    ...new Set<string>(
      filterCarsList?.map((items: carType) => {
        return items.category;
      }),
    ),
  ];

  return (
    <>
      {addNewBtn.map((L: string, index) => {
        return (
          <Button
            className="text-base"
            style={{ margin: "5px" }}
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
