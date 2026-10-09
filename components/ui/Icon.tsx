import { DynamicIcon } from "lucide-react/dynamic";

import { cn } from "@/lib/utils";

type DynamicIconProps = React.ComponentProps<typeof DynamicIcon>;

/**
 * Renders a lucide icon by name at runtime. Only for icon names that come from data (e.g. the
 * database); for a fixed icon, import it from `lucide-react` directly.
 */
function Icon({ className, ...props }: DynamicIconProps) {
  return (
    <DynamicIcon size={18} tabIndex={-1} {...props} className={cn("outline-none", className)} />
  );
}

export default Icon;
