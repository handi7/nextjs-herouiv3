import { buttonStyle } from "@/styles";
import { Button as HeroButton, ButtonProps, cn, Spinner } from "@heroui/react";
import { ReactNode } from "react";

interface Props extends ButtonProps {
  isLoading?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

function Button({ isLoading, startContent, endContent, ...props }: Props) {
  return (
    <HeroButton
      isDisabled={isLoading}
      {...props}
      className={cn(buttonStyle(), props.className)}
    >
      <>
        {isLoading && <Spinner size="sm" color="current" />}
        {startContent}
        {props.children}
        {endContent}
      </>
    </HeroButton>
  );
}

export default Button;
