"use client";

import {
  FieldError,
  InputGroup,
  InputProps,
  Label,
  TextField,
  cn,
  descriptionVariants,
} from "@heroui/react";
import { PropsWithChildren, ReactNode } from "react";

export interface InputTextProps extends InputProps {
  isRequired?: boolean;
  isDisabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
  classNames?: {
    base?: string;
    label?: string;
    labelWrapper?: string;
    inputWrapper?: string;
    inputGroup?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
  };
  labelPlacement?: "top" | "left";
  descriptionPlacement?: "top" | "bottom";
  isInvalid?: boolean;
  errorMessage?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
}

function InputText(props: InputTextProps) {
  const {
    isRequired,
    isDisabled,
    label,
    description,
    className,
    classNames,
    labelPlacement,
    descriptionPlacement = "bottom",
    isInvalid,
    errorMessage,
    startContent,
    endContent,
    ...rest
  } = props;

  return (
    <TextField
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className={cn("w-full flex flex-col gap-1", [
        { "sm:flex-row sm:gap-4": labelPlacement === "left" },
        classNames?.base,
        className,
      ])}
    >
      {label && (
        <div
          className={cn("flex flex-col gap-1", [
            { "sm:w-[150px] sm:flex-none sm:mt-2": labelPlacement === "left" },
            classNames?.labelWrapper,
          ])}
        >
          <Label
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            className={cn("", [classNames?.label])}
          >
            {label}
          </Label>

          {description && descriptionPlacement === "top" && (
            <Description isDisabled={isDisabled} className={classNames?.description}>
              {description}
            </Description>
          )}
        </div>
      )}

      <div className={cn("w-full flex flex-col gap-1", [classNames?.inputWrapper])}>
        <InputGroup className={cn("rounded-lg", [classNames?.inputGroup])}>
          {startContent && <InputGroup.Prefix>{startContent}</InputGroup.Prefix>}

          <InputGroup.Input {...rest} className={cn("w-full", [classNames?.input])} />

          {endContent && <InputGroup.Suffix>{endContent}</InputGroup.Suffix>}
        </InputGroup>

        {description && descriptionPlacement === "bottom" && (
          <Description
            isDisabled={isDisabled}
            className={cn("px-1 mt-1", [classNames?.description])}
          >
            {description}
          </Description>
        )}

        <FieldError>{errorMessage}</FieldError>
      </div>
    </TextField>
  );
}

interface DescriptionProps extends PropsWithChildren {
  isDisabled?: boolean;
  className?: string;
}

function Description({ children, isDisabled, className }: DescriptionProps) {
  return (
    <span
      className={descriptionVariants({
        className: cn({ "opacity-50": isDisabled }, className),
      })}
    >
      {children}
    </span>
  );
}

export default InputText;
