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
    <div className="glass fixed top-40 z-20 grid w-full grid-cols-3 p-2 md:right-0 md:top-36 md:w-2/3 md:grid-cols-5 lg:w-3/4 xl:w-10/12">
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
    </div>
  );
};

export default Btn;
