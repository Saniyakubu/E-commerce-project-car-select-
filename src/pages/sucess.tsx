import { Link } from "react-router-dom";
import { FiCheckCircle, FiHome, FiShoppingBag, FiMail } from "react-icons/fi";
import Navbar from "@/components/nav/Navbar";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const SuccessPage = () => {
  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#7C2D2D", "#22c55e", "#3b82f6", "#f59e0b", "#ec4899"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Big burst in the center
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });
    }, 300);
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg text-center">
          {/* Animated success icon */}
          <div className="relative mx-auto mb-8">
            <div className="absolute inset-0 mx-auto h-24 w-24 animate-ping rounded-full bg-green-400/20" />
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30">
              <FiCheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Title with animation */}
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Payment Successful! 🎉
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg text-muted-foreground">
            Thank you for choosing{" "}
            <span className="font-semibold text-primary">CarSelect</span>. Your
            order has been confirmed!
          </p>

          {/* Order confirmation card */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
              <p className="text-sm font-medium text-white/80">Order Status</p>
              <p className="text-xl font-bold text-white">Confirmed ✓</p>
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FiMail className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">
                    Confirmation Email
                  </p>
                  <p className="font-medium text-foreground">
                    Check your inbox shortly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FiShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Delivery</p>
                  <p className="font-medium text-foreground">
                    We'll contact you soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card py-4 font-semibold text-foreground transition-all hover:border-primary hover:shadow-md"
            >
              <FiHome className="h-5 w-5" />
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-90"
            >
              <FiShoppingBag className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>

          {/* Thank you note */}
          <p className="mt-8 text-sm text-muted-foreground">
            Questions? Contact us at{" "}
            <a
              href="mailto:support@carselect.com"
              className="text-primary hover:underline"
            >
              support@carselect.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default SuccessPage;
