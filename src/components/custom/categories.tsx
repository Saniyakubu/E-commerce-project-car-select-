import ColorRadioBtn from "../radioBtn/colorRadioBtn";
import RadioButton from "../radioBtn/radio";

const CategoriesList = () => {
  return (
    <aside className="fixed bottom-0 left-0 top-32 hidden w-60 flex-col items-center overflow-y-auto scroll-smooth border-r-2 p-10 focus:scroll-auto md:flex">
      <section className="mb-5 flex w-full flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold">{"Colors"}</h1>
        </div>
        <ColorRadioBtn />
      </section>

      <section className="flex w-full flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold ">{"Company"}</h1>
        </div>
        <RadioButton />
      </section>
    </aside>
  );
};

export default CategoriesList;
