import { ContextProvider, carType } from "@/Store";
import { useContext } from "react";
import Navbar from "@/components/nav/Navbar";
import CarCard from "@/components/custom/carCard";
import { SkeletonLoadingUi } from "@/components/custom/skeletonLoading";
import SideBarMenu from "@/components/custom/sideBarMenu";
import MobileMenu from "@/components/custom/mobileMenu";
import FilterBar from "@/components/filters/FilterBar";

const ShopPage = () => {
  const { newCarsList, isLoading, isError } = useContext(ContextProvider);

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg font-medium text-destructive">{isError}</p>
          <p className="mt-2 text-sm text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <span className="mb-2 block text-sm font-medium text-primary">Inventory</span>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Browse all vehicles
            </h1>
            <p className="text-muted-foreground">
              {newCarsList.length} {newCarsList.length === 1 ? "car" : "cars"} available
            </p>
          </div>

          {/* Filters */}
          <FilterBar />

          {/* Grid */}
          {isLoading ? (
            <SkeletonLoadingUi />
          ) : newCarsList.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newCarsList.map((item: carType) => (
                <CarCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card py-16 text-center">
              <p className="text-lg font-medium text-foreground">No cars found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </main>
      <SideBarMenu />
      <MobileMenu />
    </>
  );
};

export default ShopPage;
