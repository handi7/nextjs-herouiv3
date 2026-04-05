"use client";

import { Input, InputProps, Label, cn } from "@heroui/react";
import { useId } from "react";

export interface InputTextProps extends InputProps {
  isRequired?: boolean;
  label?: string;
  description?: string;
  className?: string;
  classNames?: {
    base?: string;
    label?: string;
    inputWrapper?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
  };
  labelPlacement?: "top" | "left";
  descriptionPlacement?: "top" | "bottom";
  isInvalid?: boolean;
  errorMessage?: string;
}

function InputText(props: InputTextProps) {
  const {
    isRequired,
    label,
    description,
    className,
    classNames,
    labelPlacement,
    descriptionPlacement = "bottom",
    isInvalid,
    errorMessage,
    ...rest
  } = props;
  const id = useId();

  return (
    <div
      className={cn("flex flex-col gap-1", [
        { "sm:flex-row sm:gap-4": labelPlacement === "left" },
        className,
        classNames?.base,
      ])}
    >
      {label && (
        <div
          className={cn("flex flex-col gap-1", [
            { "sm:w-[150px] sm:flex-none sm:mt-2": labelPlacement === "left" },
          ])}
        >
          <Label
            htmlFor={rest.id || id}
            className={cn("", [{ "text-danger": isInvalid }, classNames?.label])}
          >
            {label}
            {isRequired && <span className="text-danger"> *</span>}
          </Label>

          {description && descriptionPlacement === "top" && (
            <span className={cn("text-xs text-muted mt-1", [classNames?.description])}>
              {description}
            </span>
          )}
        </div>
      )}

      <div className={cn("flex flex-col w-full", [classNames?.inputWrapper])}>
        <Input
          {...rest}
          id={rest.id || id}
          className={cn("rounded-lg", [
            { "border border-danger ring-danger background-danger": isInvalid },
            classNames?.input,
          ])}
        />

        {description && descriptionPlacement === "bottom" && (
          <span className={cn("text-xs text-muted mt-1", [classNames?.description])}>
            {description}
          </span>
        )}

        {isInvalid && (
          <span className={cn("text-xs text-danger mt-1", [classNames?.errorMessage])}>
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}

export default InputText;
