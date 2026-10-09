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
      className={cn("flex w-full flex-col gap-1", [
        { "sm:flex-row sm:gap-4": labelPlacement === "left" },
        classNames?.base,
        className,
      ])}
    >
      <LabelBlock
        label={label}
        labelPlacement={labelPlacement}
        description={description}
        descriptionPlacement={descriptionPlacement}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        classNames={classNames}
      />

      <div className={cn("flex w-full flex-col gap-1", [classNames?.inputWrapper])}>
        <InputGroup className={cn("rounded-lg", [classNames?.inputGroup])}>
          {startContent && <InputGroup.Prefix>{startContent}</InputGroup.Prefix>}

          <InputGroup.Input {...rest} className={cn("w-full", [classNames?.input])} />

          {endContent && <InputGroup.Suffix>{endContent}</InputGroup.Suffix>}
        </InputGroup>

        {description && descriptionPlacement === "bottom" && (
          <Description
            isDisabled={isDisabled}
            className={cn("mt-1 px-1", [classNames?.description])}
          >
            {description}
          </Description>
        )}

        <FieldError>{errorMessage}</FieldError>
      </div>
    </TextField>
  );
}

interface LabelBlockProps {
  label?: string;
  labelPlacement?: InputTextProps["labelPlacement"];
  description?: string;
  descriptionPlacement: InputTextProps["descriptionPlacement"];
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  classNames?: InputTextProps["classNames"];
}

function LabelBlock(props: LabelBlockProps) {
  const {
    label,
    labelPlacement,
    description,
    descriptionPlacement,
    isRequired,
    isDisabled,
    isInvalid,
    classNames,
  } = props;

  if (!label) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-col gap-1", [
        { "sm:mt-2 sm:w-37.5 sm:flex-none": labelPlacement === "left" },
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
