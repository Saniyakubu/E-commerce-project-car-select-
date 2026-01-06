import { carType } from "@/Store";
import { memo, useContext, useState } from "react";
import { ContextProvider } from "@/Store";
import { FiMinus, FiPlus } from "react-icons/fi";
import CarDetailsModal from "@/components/CarDetailsModal";

type Props = {
  item: carType;
};

const CarCard = ({ item }: Props) => {
  const { addItemToCart, cartItems, removeItemFromCart, decrementItemFromCart, Checkouts, isLoading } =
    useContext(ContextProvider);
  const [modalOpen, setModalOpen] = useState(false);

  const quantity = cartItems[item._id] || 0;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItemToCart(item._id);
    Checkouts({ cartItems: { [item._id]: 1 } });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItemToCart(item._id);
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={item.image}
            alt={item.model}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {item.mileage === "New" && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
              New
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-1 text-sm font-medium text-primary">{item.company}</p>
          <h3 className="mb-1 text-lg font-semibold text-foreground">{item.model}</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            {item.category} · {item.color} · {item.year}
          </p>

          {/* Specs pills */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
              {item.seats} seats
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
              {item.transmission}
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
              {item.fuelType}
            </span>
          </div>

          {/* Price */}
          <p className="mb-4 text-2xl font-bold text-foreground">
            ${item.price.toLocaleString()}
          </p>

          {/* Actions */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {quantity > 0 ? (
              <>
                <div className="flex flex-1 items-center justify-between rounded-xl border border-border bg-card px-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decrementItemFromCart(item._id);
                    }}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <span className="font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={handleAddToCart}
                    className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItemFromCart(item._id);
                  }}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:shadow-md"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                >
                  Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <CarDetailsModal
        car={item}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
};

export default memo(CarCard);
