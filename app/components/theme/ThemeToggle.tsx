import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const themeCycle = ["light", "dark", "system"] as const;

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const activeTheme = theme ?? "system";

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextTheme =
    themeCycle[
      (themeCycle.indexOf(activeTheme as (typeof themeCycle)[number]) + 1) %
        themeCycle.length
    ];

  const Icon =
    activeTheme === "dark" ? Moon : activeTheme === "light" ? Sun : Monitor;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Ganti tema"
            className="glass-button"
            disabled={!mounted}
            onClick={() => setTheme(nextTheme)}
            size="icon"
            type="button"
            variant="outline"
          >
            <Icon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Tema: {mounted ? activeTheme : "system"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
