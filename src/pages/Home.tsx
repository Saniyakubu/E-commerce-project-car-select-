import { ContextProvider } from "@/Store";
import Btn from "@/components/Button/Btn";
import { useContext } from "react";
import { carType } from "@/Store";
import Navbar from "@/components/nav/Navbar";
import CarCard from "@/components/custom/carCard";
import { SkeletonLoadingUi } from "@/components/custom/skeletonLoading";
import SideBarMenu from "@/components/custom/sideBarMenu";
import CategoriesList from "@/components/custom/categories";
import MobileMenu from "@/components/custom/mobileMenu";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const { newCarsList, isLoading, isError } = useContext(ContextProvider);

  if (isError) {
    return <h1>{isError}</h1>;
  }

  return (
    <>
      <Navbar />
      <Btn />
      <section className="relative flex h-full justify-between">
        <CategoriesList />
        <MobileMenu />
        <div className="mt-96 h-full w-full md:ml-64 md:mt-72 md:w-3/4 xl:w-full">
          {isLoading ? (
            <SkeletonLoadingUi />
          ) : (
            <div className="grid h-full w-full grid-cols-1 gap-5 p-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {newCarsList &&
                newCarsList.map((item: carType) => (
                  <CarCard key={item._id} item={item} />
                ))}
            </div>
          )}
        </div>
        <SideBarMenu />
      </section>
    </>
  );
};

export default HomePage;
