import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "@/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:bg-secondary hover:shadow-md"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FiMoon className="h-4 w-4" />
      ) : (
        <FiSun className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;

