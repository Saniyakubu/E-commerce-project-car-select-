export type FuelType = "Gasoline" | "Electric" | "Hybrid" | "Diesel";
export type Transmission = "Automatic" | "Manual";

export type Car = {
  _id: number;
  model: string;
  category: string;
  color: string;
  price: number;
  company: string;
  image: string;
  // Extended details
  seats: number;
  transmission: Transmission;
  fuelType: FuelType;
  year: number;
  mileage: string;
  description: string;
};
