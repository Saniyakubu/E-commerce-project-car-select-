import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cars from "@/Db/Products";
import { Car } from "@/types/car";

// Map static cars with all extended details
const mapStaticCars = (staticCars: typeof Cars): Car[] =>
  staticCars.map((car) => ({
    _id: car.id,
    model: car.model,
    category: car.category,
    color: car.color,
    price: car.price,
    company: car.company,
    image: car.image,
    seats: car.seats,
    transmission: car.transmission,
    fuelType: car.fuelType,
    year: car.year,
    mileage: car.mileage,
    description: car.description,
  }));

// Static data as our source (backend doesn't have extended fields)
const staticCarsList = mapStaticCars(Cars);

const fetchCars = async (): Promise<Car[]> => {
  try {
    const res = await axios.get("https://carlists.onrender.com/products");
    const products = res?.data?.products;
    
    if (!products) return staticCarsList;
    
    // Merge backend data with static extended details
    return products.map((apiCar: any) => {
      const staticCar = staticCarsList.find(
        (s) => s.model === apiCar.model || s._id === (apiCar._id ?? apiCar.id)
      );
      
      return {
        _id: apiCar._id ?? apiCar.id,
        model: apiCar.model,
        category: apiCar.category,
        color: apiCar.color,
        price: apiCar.price,
        company: apiCar.company,
        image: staticCar?.image ?? apiCar.image,
        // Use static data for extended fields
        seats: staticCar?.seats ?? 5,
        transmission: staticCar?.transmission ?? "Automatic",
        fuelType: staticCar?.fuelType ?? "Gasoline",
        year: staticCar?.year ?? 2024,
        mileage: staticCar?.mileage ?? "New",
        description: staticCar?.description ?? "A quality vehicle with excellent features and performance.",
      };
    });
  } catch {
    return staticCarsList;
  }
};

const useCars = () => {
  return useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    placeholderData: staticCarsList,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export default useCars;
