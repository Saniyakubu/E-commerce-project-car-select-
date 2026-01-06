import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "@/components/nav/Navbar";
import { ContextProvider, carType } from "@/Store";
import CarDetailsModal from "@/components/CarDetailsModal";
import { FiShield, FiDollarSign, FiTruck, FiAward, FiStar, FiArrowRight } from "react-icons/fi";

const LandingPage = () => {
  const { filterCarsList, addItemToCart } = useContext(ContextProvider);
  const [selectedCar, setSelectedCar] = useState<carType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const featuredCars = useMemo<carType[]>(() => {
    // Get 3 premium cars
    const sorted = [...filterCarsList].sort((a, b) => b.price - a.price);
    return sorted.slice(0, 3);
  }, [filterCarsList]);

  const handleCarClick = (car: carType) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-secondary via-background to-secondary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.08),transparent_50%)]" />
          <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:pb-28 md:pt-40">
            <div className="relative z-10 max-w-2xl">
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Premium Selection
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Find your perfect <span className="text-primary">drive</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Discover quality vehicles with transparent pricing, comprehensive inspections, and a seamless buying experience you can trust.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Browse Inventory
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 font-semibold text-foreground transition-all hover:border-primary hover:shadow-md"
                >
                  View Featured
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="border-b border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
                Why choose CarSelect
              </h2>
              <p className="text-muted-foreground">
                We make buying your next car simple and trustworthy
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <FiShield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  Every vehicle undergoes a comprehensive 150-point inspection before listing
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <FiDollarSign className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Fair Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent, no-haggle pricing based on real market data
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <FiTruck className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Home Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Get your car delivered right to your doorstep, hassle-free
                </p>
              </div>

              <div className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <FiAward className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">Warranty Included</h3>
                <p className="text-sm text-muted-foreground">
                  90-day comprehensive warranty on all vehicles for peace of mind
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        <section id="featured" className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="mb-2 block text-sm font-medium text-primary">Featured</span>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Premium picks
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                View all cars
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {featuredCars.map((car) => (
                <div
                  key={car._id}
                  onClick={() => handleCarClick(car)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    {car.mileage === "New" && (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-sm font-medium text-primary">{car.company}</p>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{car.model}</h3>
                    <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-secondary px-2.5 py-1">{car.category}</span>
                      <span className="rounded-full bg-secondary px-2.5 py-1">{car.transmission}</span>
                      <span className="rounded-full bg-secondary px-2.5 py-1">{car.fuelType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-foreground">
                        ${car.price.toLocaleString()}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItemToCart(car._id);
                        }}
                        className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all cars
                <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Section / Testimonial */}
        <section className="border-t border-border bg-secondary py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="h-6 w-6 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="mb-6 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
              "The entire process was seamless. Found my dream car, got it delivered to my door, and the quality exceeded my expectations. CarSelect made buying a car actually enjoyable."
            </blockquote>
            <div>
              <p className="font-semibold text-foreground">Sarah Mitchell</p>
              <p className="text-sm text-muted-foreground">Verified Buyer · Tesla Model 3</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
              Ready to find your next car?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Browse our full inventory of quality vehicles
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              Browse Inventory
              <FiArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2024 CarSelect. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground">Privacy</a>
                <a href="#" className="hover:text-foreground">Terms</a>
                <a href="#" className="hover:text-foreground">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <CarDetailsModal
        car={selectedCar}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default LandingPage;
