import { Button as HeroButton, type ButtonProps as HeroButtonProps, Spinner } from "@heroui/react";
import { ReactNode } from "react";

import { buttonStyle } from "@/styles";

interface ButtonProps extends Omit<HeroButtonProps, "children" | "className"> {
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

function Button({
  variant = "primary",
  size = "md",
  isDisabled,
  isLoading = false,
  loadingText,
  startContent,
  endContent,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <HeroButton
      {...props}
      variant={variant}
      size={size}
      isDisabled={isDisabled || isLoading}
      data-loading={isLoading || undefined}
      aria-busy={isLoading || undefined}
      className={buttonStyle({ variant, size, className })}
    >
      {isLoading ? <Spinner size="sm" color="current" /> : startContent}

      {isLoading && loadingText ? loadingText : children}

      {endContent}
    </HeroButton>
  );
}

export { Button, buttonStyle as buttonVariants, type ButtonProps };
