"use client";

import NextLink from "next/link";

import { Drawer, Focusable, Tooltip } from "@heroui/react";
import { PanelLeftIcon } from "lucide-react";
import {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Button } from "@/components/ui/Button";
import useMobile from "@/hooks/useMobile";
import { cn } from "@/lib/utils";

const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextValue = {
  isMobile: boolean;
  /** Desktop: expanded (true) or collapsed to icons (false). */
  isOpen: boolean;
  /** Collapsed to icons on desktop. Never true on mobile, where the sidebar is a drawer. */
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = use(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

interface SidebarProviderProps extends PropsWithChildren {
  defaultOpen?: boolean;
}

/** Sidebar state: collapsible on desktop, a drawer on mobile. Toggle with ⌘/Ctrl + B. */
function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  const isMobile = useMobile();
  const [isOpen, setOpen] = useState(defaultOpen);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen((open) => !open);
    } else {
      setOpen((open) => !open);
    }
  }, [isMobile]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  const value = useMemo(
    () => ({
      isMobile,
      isOpen,
      isCollapsed: !isMobile && !isOpen,
      isMobileOpen,
      setMobileOpen,
      toggle,
    }),
    [isMobile, isOpen, isMobileOpen, toggle],
  );

  return (
    <SidebarContext value={value}>
      <div className="flex min-h-dvh w-full">{children}</div>
    </SidebarContext>
  );
}

function Sidebar({ children, className }: PropsWithChildren<{ className?: string }>) {
  const { isMobile, isCollapsed, isMobileOpen, setMobileOpen } = useSidebar();

  if (isMobile) {
    return (
      <Drawer isOpen={isMobileOpen} onOpenChange={setMobileOpen}>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog aria-label="Navigation" className="w-72 max-w-[85vw] p-0">
              <div className={cn("flex h-full flex-col", className)}>{children}</div>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    );
  }

  return (
    <aside
      data-state={isCollapsed ? "collapsed" : "expanded"}
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-e border-separator bg-surface transition-[width] duration-200 ease-linear md:flex",
        isCollapsed ? "w-14" : "w-64",
        className,
      )}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2 p-2">{children}</div>;
}

function SidebarContent({ children }: PropsWithChildren) {
  return <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-2">{children}</div>;
}

function SidebarFooter({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2 p-2">{children}</div>;
}

function SidebarGroup({ label, children }: PropsWithChildren<{ label?: string }>) {
  const { isCollapsed } = useSidebar();

  return (
    <nav aria-label={label} className="flex flex-col gap-1">
      {label && (
        <span
          className={cn(
            "flex h-8 items-center px-2.5 text-xs font-medium text-muted transition-opacity",
            isCollapsed && "opacity-0",
          )}
        >
          {label}
        </span>
      )}
      {children}
    </nav>
  );
}

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  isExternal?: boolean;
}

/** Navigation link. Shows its label as a tooltip while the sidebar is collapsed. */
function SidebarItem({ href, icon, label, isActive, isExternal }: SidebarItemProps) {
  const { isCollapsed, isMobile, setMobileOpen } = useSidebar();

  return (
    <Tooltip delay={0} isDisabled={!isCollapsed}>
      <Focusable>
        <NextLink
          href={href}
          aria-current={isActive ? "page" : undefined}
          data-active={isActive || undefined}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          onClick={() => isMobile && setMobileOpen(false)}
          className={cn(
            "flex h-9 items-center gap-3 rounded-(--radius) px-2.5 text-sm whitespace-nowrap text-foreground/80 outline-none hover:bg-default hover:text-foreground focus-visible:ring-2 focus-visible:ring-focus data-active:bg-default data-active:font-medium data-active:text-foreground [&_svg]:size-4 [&_svg]:shrink-0",
            isCollapsed && "justify-center px-0",
          )}
        >
          {icon}
          <span className={cn("truncate", isCollapsed && "sr-only")}>{label}</span>
        </NextLink>
      </Focusable>
      <Tooltip.Content placement="right">{label}</Tooltip.Content>
    </Tooltip>
  );
}

function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="sm"
      isIconOnly
      aria-label="Toggle sidebar"
      onPress={toggle}
      className={className}
    >
      <PanelLeftIcon />
    </Button>
  );
}

/** The main area next to the sidebar. */
function SidebarInset({ children }: PropsWithChildren) {
  return <div className="flex min-w-0 flex-1 flex-col">{children}</div>;
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
