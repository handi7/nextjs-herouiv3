"use client";

import { useTheme } from "next-themes";

import InputSwitch from "@/components/ui/InputSwitch";
import useMounted from "@/hooks/useMounted";

/** Dark mode toggle. The theme is only known on the client, so it renders off until mounted. */
function ThemeSwitch({ label = "Dark mode" }: { label?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isMounted = useMounted();

  return (
    <InputSwitch
      label={label}
      isSelected={isMounted && resolvedTheme === "dark"}
      onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
    />
  );
}

export default ThemeSwitch;
