"use client";

import { usePathname } from "next/navigation";

import {
  BellIcon,
  BoxIcon,
  CalendarIcon,
  FolderGit2Icon,
  LayoutDashboardIcon,
  ListChecksIcon,
  MousePointerClickIcon,
  PanelsTopLeftIcon,
  TextCursorInputIcon,
  ToggleRightIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  useSidebar,
} from "@/components/ui/Sidebar";
import { cn } from "@/lib/utils";

const componentSections = [
  { label: "Buttons", href: "/#buttons", icon: <MousePointerClickIcon /> },
  { label: "Feedback & overlays", href: "/#feedback", icon: <BellIcon /> },
  { label: "Text & numbers", href: "/#text", icon: <TextCursorInputIcon /> },
  { label: "Label placement", href: "/#placement", icon: <PanelsTopLeftIcon /> },
  { label: "Selection", href: "/#selection", icon: <ListChecksIcon /> },
  { label: "Toggles & choices", href: "/#toggles", icon: <ToggleRightIcon /> },
  { label: "Range & dates", href: "/#dates", icon: <CalendarIcon /> },
];

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup label="Platform">
          <SidebarItem
            href="/"
            label="Dashboard"
            icon={<LayoutDashboardIcon />}
            isActive={pathname === "/"}
          />
        </SidebarGroup>

        <SidebarGroup label="Components">
          {componentSections.map((section) => (
            <SidebarItem key={section.href} {...section} />
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarItem
          isExternal
          href="https://github.com/handi7/nextjs-herouiv3"
          label="Repository"
          icon={<FolderGit2Icon />}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

function Brand() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-10 items-center gap-2 overflow-hidden px-1">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-(--radius) bg-accent text-accent-foreground">
        <BoxIcon className="size-4" />
      </span>

      <span
        className={cn(
          "flex min-w-0 flex-col leading-tight whitespace-nowrap transition-opacity",
          isCollapsed && "opacity-0",
        )}
      >
        <span className="text-sm font-medium">Next HeroUI</span>
        <span className="text-xs text-muted">Boilerplate</span>
      </span>
    </div>
  );
}

export default AppSidebar;
