import { ContextProvider } from "@/Store";
import { memo, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AuthModal from "@/components/auth/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

const Navbar = () => {
  const [user, setUser] = useState<{ user: string } | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const {
    isLoading,
    setIsLoading,
    cartCount,
    clearCart,
    value,
    authModalOpen,
    setAuthModalOpen,
  } = useContext(ContextProvider);
  const location = useLocation();

  async function logoutUserOUT() {
    setIsLoading(true);
    try {
      await axios.get("https://carlists.onrender.com/logout", {
        withCredentials: true,
      });
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  }, [authModalOpen]);

  const handleAuthSuccess = () => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-foreground">
          Car<span className="text-primary">Select</span>
        </Link>

        {/* Center nav links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/shop" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Shop
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Clear cart button - only show when cart has items */}
          {value && (
            <button
              onClick={clearCart}
              className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm text-muted-foreground transition-all hover:border-destructive hover:text-destructive"
              title="Clear cart"
            >
              <FiTrash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}

          {/* Cart indicator */}
          <Link
            to="/shop"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:shadow-md"
          >
            <FiShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Auth */}
          {user ? (
            <button
              disabled={isLoading}
              onClick={logoutUserOUT}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:shadow-md disabled:opacity-50"
            >
              {isLoading ? "..." : "Log out"}
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onAuthSuccess={handleAuthSuccess}
      />
    </header>
  );
};

export default memo(Navbar);
