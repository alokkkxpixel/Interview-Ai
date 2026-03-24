import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-2 px-2">
      <Button
        variant="outline"
        //   size="icon"
        onClick={toggleTheme}
        className="flex relative items-center justify-center  my-2"
      >
        {/* Sun */}
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
        {/* Moon */}
        <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </Button>
      <span className="text-black dark:text-white">Theme toggle</span>
    </div>
  );
}
