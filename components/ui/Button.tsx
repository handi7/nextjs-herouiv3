import { buttonStyle } from "@/styles";
import { Button as HeroButton, ButtonProps, cn, Spinner } from "@heroui/react";

interface Props extends ButtonProps {
  isLoading?: boolean;
}

function Button({ isLoading, ...props }: Props) {
  return (
    <HeroButton isDisabled={isLoading} {...props} className={cn(buttonStyle(), props.className)}>
      <>
        {isLoading && <Spinner size="sm" color="current" />}
        {props.children}
      </>
    </HeroButton>
  );
}

export default Button;
