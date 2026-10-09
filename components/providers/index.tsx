"use client";

import { PropsWithChildren } from "react";

import { ThemeProvider } from "./ThemeProvider";

function Providers({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Providers;
