import * as Dialog from "@radix-ui/react-dialog";
import { Car } from "@/types/car";
import { ContextProvider } from "@/Store";
import { useContext } from "react";
import { FiX, FiUsers, FiSettings, FiZap, FiCalendar } from "react-icons/fi";

type CarDetailsModalProps = {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CarDetailsModal = ({ car, open, onOpenChange }: CarDetailsModalProps) => {
  const { addItemToCart, Checkouts, isLoading, cartItems } = useContext(ContextProvider);

  if (!car) return null;

  const handleBuyNow = () => {
    // Add to cart and checkout immediately
    addItemToCart(car._id);
    Checkouts({ cartItems: { [car._id]: 1 } });
  };

  const handleAddToCart = () => {
    addItemToCart(car._id);
    onOpenChange(false);
  };

  const quantity = cartItems[car._id] || 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          {/* Close button */}
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-muted-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-secondary hover:text-foreground">
              <FiX className="h-5 w-5" />
            </button>
          </Dialog.Close>

          {/* Hero image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
            <img
              src={car.image}
              alt={car.model}
              className="h-full w-full object-contain p-4"
            />
            {car.mileage === "New" && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                New
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-sm font-medium text-primary">{car.company}</p>
                <Dialog.Title className="text-2xl font-bold text-foreground md:text-3xl">
                  {car.model}
                </Dialog.Title>
                <p className="mt-1 text-muted-foreground">
                  {car.category} · {car.color} · {car.year}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">
                  ${car.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{car.mileage}</p>
              </div>
            </div>

            {/* Specs grid */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FiUsers className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Seats</p>
                  <p className="font-semibold text-foreground">{car.seats}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FiSettings className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Transmission</p>
                  <p className="font-semibold text-foreground">{car.transmission}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FiZap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold text-foreground">{car.fuelType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FiCalendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Year</p>
                  <p className="font-semibold text-foreground">{car.year}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="mb-2 font-semibold text-foreground">About this vehicle</h3>
              <p className="leading-relaxed text-muted-foreground">{car.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-xl border border-border bg-card py-4 font-semibold text-foreground transition-all hover:border-primary hover:shadow-md"
              >
                {quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isLoading}
                className="flex-1 rounded-xl bg-primary py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CarDetailsModal;

