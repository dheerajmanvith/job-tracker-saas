import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


function ThemeToggle() {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;


  const isDark = theme === "dark";


  return (

    <Button

      type="button"

      variant="outline"

      size="icon"

      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark"
        )
      }


      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }


      title={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }


    >

      {
        isDark
          ?
          <Sun
            size={18}
            aria-hidden="true"
          />
          :
          <Moon
            size={18}
            aria-hidden="true"
          />
      }


    </Button>

  );

}


export default ThemeToggle;