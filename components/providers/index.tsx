"use client";

import { PropsWithChildren } from "react";

import { ThemeProvider } from "./theme-provider";

function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Providers;
