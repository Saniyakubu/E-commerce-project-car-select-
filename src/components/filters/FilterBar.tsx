import { ContextProvider } from "@/Store";
import { useContext, useMemo } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterBar = () => {
  const {
    filterCarsList,
    filters,
    updateFilter,
    resetFilters,
    inputValue,
    setInputValue,
  } = useContext(ContextProvider);

  const categories = useMemo(
    () => ["All", ...new Set(filterCarsList.map((car) => car.category))],
    [filterCarsList]
  );

  const companies = useMemo(
    () => ["All", ...new Set(filterCarsList.map((car) => car.company))],
    [filterCarsList]
  );

  const colors = useMemo(
    () => ["All", ...new Set(filterCarsList.map((car) => car.color))],
    [filterCarsList]
  );

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.company !== "All" ||
    filters.color !== "All" ||
    inputValue.trim() !== "";

  return (
    <div className="mb-8 rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search by model..."
            className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          />
          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-full sm:w-auto sm:min-w-[160px]">
            <Select
              value={filters.category}
              onValueChange={(val) => updateFilter("category", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto sm:min-w-[160px]">
            <Select
              value={filters.company}
              onValueChange={(val) => updateFilter("company", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((comp) => (
                  <SelectItem key={comp} value={comp}>
                    {comp === "All" ? "All Brands" : comp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto sm:min-w-[140px]">
            <Select
              value={filters.color}
              onValueChange={(val) => updateFilter("color", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color === "All" ? "All Colors" : color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <FiX className="h-4 w-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
