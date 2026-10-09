"use client";

import { Toast } from "@heroui/react";
import { PropsWithChildren } from "react";

import { ThemeProvider } from "./ThemeProvider";

function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
      <Toast.Provider placement="top" />
    </ThemeProvider>
  );
}

export default Providers;
