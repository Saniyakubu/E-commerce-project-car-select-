import AudiA4Luxury from "../assets/AudiA4-Luxury-(gray).png";
import BMW3Series from "../assets/BMW-3-Series-Luxury(silver).png";
import ChevroletMalibu from "../assets/Chevrolet Malibu-Sedan(white).png";
import ChevroletSilverado from "../assets/Chevrolet-Silverado-Truck(red).png";
import ChevroletTraverse from "../assets/Chevrolet-Traverse-SUV(red).png";
import FordMustang from "../assets/Ford Mustang-Sports Car(red).png";
import FordExplorer from "../assets/Ford-Explorer-SUV(white).png";
import FordF150 from "../assets/Ford-F-150-Truck(silver).png";
import GMCSierra from "../assets/GMC-Sierra-Truck(blue).png";
import HondaCivic from "../assets/Honda-Civic-Sedan(blue).png";
import HondaOdyssey from "../assets/Honda-Odyssey-Minivan(white).png";
import JeepWrangler from "../assets/Jeep-Wrangler-SUV(Green).png";
import KiaSportage from "../assets/Kia-Sportage-SUV(black).png";
import MazdaCX5 from "../assets/Mazda-CX-5-SUV(gray).png";
import MercedesBenz from "../assets/Mercedes-Benz C-Class-Luxury(black).png";
import NissanTitan from "../assets/Nissan-Titan-Truck(gray).png";
import NissanAltima from "../assets/NissanAltima-Sedan(black).jpg";
import Ram1500 from "../assets/Ram-1500-Truck(black).png";
import SubaruOutback from "../assets/Subaru-Outback-Wagon(blue).png";
import TeslaModel3 from "../assets/TeslaModel3-electric(blue).png";
import ToyotaCamry from "../assets/Toyota Camry-Sedan(silver).png";
import ToyotaRAV4 from "../assets/Toyota-RAV4-SUV(blue).png";
import Volkswagen from "../assets/Volkswagen-Golf-SportWagen-Wagon(white).png";
import VolvoV60 from "../assets/Volvo-V60-Wagon(blue).png";
import HyundaiTucson from "../assets/Hyundai-Tucson-SUV(siver).png";

const Cars = [
  {
    id: 1,
    model: "Toyota Camry",
    category: "Sedan",
    color: "Silver",
    price: 25000,
    company: "Toyota",
    image: ToyotaCamry,
  },
  {
    id: 2,
    model: "Honda Civic",
    category: "Sedan",
    color: "Blue",
    price: 22000,
    company: "Honda",
    image: HondaCivic,
  },
  {
    id: 3,
    model: "Ford Mustang",
    category: "Sports Car",
    color: "Red",
    price: 35000,
    company: "Ford",
    image: FordMustang,
  },
  {
    id: 4,
    model: "Chevrolet Malibu",
    category: "Sedan",
    color: "White",
    price: 28000,
    company: "Chevrolet",
    image: ChevroletMalibu,
  },
  {
    id: 5,
    model: "Nissan Altima",
    category: "Sedan",
    color: "Black",
    price: 23000,
    company: "Nissan",
    image: NissanAltima,
  },
  {
    id: 6,
    model: "Tesla Model 3",
    category: "Electric",
    color: "Blue",
    price: 50000,
    company: "Tesla",
    image: TeslaModel3,
  },
  {
    id: 7,
    model: "BMW 3 Series",
    category: "Luxury",
    color: "Silver",
    price: 45000,
    company: "BMW",
    image: BMW3Series,
  },
  {
    id: 8,
    model: "Audi A4",
    category: "Luxury",
    color: "Gray",
    price: 48000,
    company: "Audi",
    image: AudiA4Luxury,
  },
  {
    id: 9,
    model: "Mercedes-Benz C-Class",
    category: "Luxury",
    color: "Black",
    price: 52000,
    company: "Mercedes-Benz",
    image: MercedesBenz,
  },
  {
    id: 10,
    model: "Jeep Wrangler",
    category: "SUV",
    color: "Green",
    price: 35000,
    company: "Jeep",
    image: JeepWrangler,
  },
  {
    id: 11,
    model: "Ford Explorer",
    category: "SUV",
    color: "White",
    price: 40000,
    company: "Ford",
    image: FordExplorer,
  },
  {
    id: 12,
    model: "Toyota RAV4",
    category: "SUV",
    color: "Blue",
    price: 32000,
    company: "Toyota",
    image: ToyotaRAV4,
  },
  {
    id: 13,
    model: "Chevrolet Traverse",
    category: "SUV",
    color: "Red",
    price: 38000,
    company: "Chevrolet",
    image: ChevroletTraverse,
  },
  {
    id: 14,
    model: "Hyundai Tucson",
    category: "SUV",
    color: "Silver",
    price: 28000,
    company: "Hyundai",
    image: HyundaiTucson,
  },
  {
    id: 15,
    model: "Kia Sportage",
    category: "SUV",
    color: "Black",
    price: 30000,
    company: "Kia",
    image: KiaSportage,
  },
  {
    id: 16,
    model: "Mazda CX-5",
    category: "SUV",
    color: "Gray",
    price: 29000,
    company: "Mazda",
    image: MazdaCX5,
  },
  {
    id: 17,
    model: "Subaru Outback",
    category: "Wagon",
    color: "Blue",
    price: 33000,
    company: "Subaru",
    image: SubaruOutback,
  },
  {
    id: 18,
    model: "Volkswagen Golf SportWagen",
    category: "Wagon",
    color: "White",
    price: 31000,
    company: "Volkswagen",
    image: Volkswagen,
  },
  {
    id: 19,
    model: "Volvo V60",
    category: "Wagon",
    color: "Blue",
    price: 36000,
    company: "Volvo",
    image: VolvoV60,
  },
  {
    id: 20,
    model: "Ford F-150",
    category: "Truck",
    color: "Silver",
    price: 40000,
    company: "Ford",
    image: FordF150,
  },
  {
    id: 21,
    model: "Chevrolet Silverado",
    category: "Truck",
    color: "Red",
    price: 42000,
    company: "Chevrolet",
    image: ChevroletSilverado,
  },
  {
    id: 22,
    model: "Ram 1500",
    category: "Truck",
    color: "Black",
    price: 45000,
    company: "Ram",
    image: Ram1500,
  },
  {
    id: 23,
    model: "GMC Sierra",
    category: "Truck",
    color: "Blue",
    price: 47000,
    company: "GMC",
    image: GMCSierra,
  },
  {
    id: 24,
    model: "Nissan Titan",
    category: "Truck",
    color: "Gray",
    price: 43000,
    company: "Nissan",
    image: NissanTitan,
  },
  {
    id: 25,
    model: "Honda Odyssey",
    category: "Minivan",
    color: "White",
    price: 35000,
    company: "Honda",
    image: HondaOdyssey,
  },
];

// mongodb+srv://Speedy:<password>@ecommerce-project.zkti3pk.mongodb.net/?retryWrites=true&w=majority

export default Cars;
