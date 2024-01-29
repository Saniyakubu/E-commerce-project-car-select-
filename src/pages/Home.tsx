import { ContextProvider } from "@/Store";
import Btn from "@/components/Button/Btn";
import RadioButton from "@/components/radioBtn/radio";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CgMenuRight } from "react-icons/cg";
import ColorRadioBtn from "@/components/radioBtn/colorRadioBtn";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import "react-toastify/dist/ReactToastify.css";
import { carType } from "@/Store";
import Navbar from "@/components/nav/Navbar";
import axios from "axios";
import CarCard from "@/components/custom/carCard";
import { SkeletonLoadingUi } from "@/components/custom/skeletonLoading";
import SideBarMenu from "@/components/custom/sideBarMenu";
import CategoriesList from "@/components/custom/categories";
import MobileMenu from "@/components/custom/mobileMenu";

const HomePage = () => {
  const {
    filterCarsList,
    newCarsList,
    cartItems,
    value,
    totalAmount,
    Checkouts,
    isLoading,
    setIsLoading,
  } = useContext(ContextProvider);
  const [user, isUser] = useState(
    JSON.parse(localStorage.getItem("user") as string) || null,
  );

  useEffect(() => {
    isUser(localStorage.getItem("user") as string);
  }, [user]);

  const logout = async () => {
    setIsLoading(true);
    try {
      await axios.get("https://carlists.onrender.com/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      setIsLoading(false);
      isUser(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="glass fixed top-40 z-20 grid w-full grid-cols-3 p-2 md:right-0 md:top-36 md:w-2/3 md:grid-cols-5 lg:w-3/4 xl:w-10/12">
        <Btn />
      </div>
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
