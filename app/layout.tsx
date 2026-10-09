import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "./globals.css";

import AppSidebar from "@/components/AppSidebar";
import Providers from "@/components/providers";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next HeroUI Boilerplate",
  description: "Next.js boilerplate with HeroUI v3, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground">
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b border-separator bg-background/80 px-4 backdrop-blur">
                <SidebarTrigger />
                <div className="h-4 w-px bg-separator" />
                <span className="text-sm font-medium">Components</span>
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
