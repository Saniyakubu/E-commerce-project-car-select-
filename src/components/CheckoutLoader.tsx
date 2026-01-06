import { ContextProvider } from "@/Store";
import { useContext } from "react";
import { FiCreditCard } from "react-icons/fi";

const CheckoutLoader = () => {
  const { checkoutLoading } = useContext(ContextProvider);

  if (!checkoutLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-2xl">
        {/* Animated card icon */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <FiCreditCard className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h3 className="mb-1 text-lg font-semibold text-foreground">
            Redirecting to Checkout
          </h3>
          <p className="text-sm text-muted-foreground">
            Please wait while we connect to Stripe...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutLoader;

