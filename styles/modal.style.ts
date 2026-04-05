import { modalVariants } from "@heroui/styles";

type ModalStyleProps = Parameters<typeof modalVariants>[0];

export const modalStyle = (props?: ModalStyleProps) => {
  return modalVariants({
    variant: "blur",
    ...props,
  });
};
