import { buttonVariants, cn } from "@heroui/styles";

type ButtonStyleProps = Parameters<typeof buttonVariants>[0];

export const buttonStyle = (props?: ButtonStyleProps) => {
  const { class: cls, className, ...rest } = props || {};

  return buttonVariants({
    variant: "primary",
    size: "md",
    ...rest,
    className: cn("rounded-lg", className, cls),
  });
};
