"use client";

import { Description, FieldError, Label } from "@heroui/react";
import { descriptionVariants, fieldErrorVariants } from "@heroui/styles";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type FieldClassNames = {
  base?: string;
  label?: string;
  labelWrapper?: string;
  inputWrapper?: string;
  description?: string;
  errorMessage?: string;
};

interface FieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  labelPlacement?: "top" | "left";
  descriptionPlacement?: "top" | "bottom";
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

/** Root layout classes for a field component (TextField, NumberField, ...). */
function fieldRootClassName(
  labelPlacement: FieldProps["labelPlacement"],
  ...classNames: (string | undefined)[]
) {
  return cn("flex w-full flex-col gap-1", [
    { "sm:flex-row sm:gap-4": labelPlacement === "left" },
    ...classNames,
  ]);
}

/** `errorMessage` implies invalid unless `isInvalid` is set explicitly. */
function resolveInvalid(isInvalid: boolean | undefined, errorMessage: string | undefined) {
  return isInvalid ?? Boolean(errorMessage);
}

interface FieldShellProps extends FieldProps, PropsWithChildren {
  classNames?: FieldClassNames;
}

/**
 * Label, description and error around a control. Render it inside the HeroUI field root
 * so the label, description and error are wired to the control through slots.
 */
function FieldShell(props: FieldShellProps) {
  const {
    children,
    description,
    descriptionPlacement = "bottom",
    errorMessage,
    classNames,
  } = props;

  return (
    <>
      <FieldLabelBlock {...props} descriptionPlacement={descriptionPlacement} />

      <div className={cn("flex w-full flex-col gap-1", [classNames?.inputWrapper])}>
        {children}

        {description && descriptionPlacement === "bottom" && (
          <FieldDescription
            isDisabled={props.isDisabled}
            className={cn("mt-1 px-1", [classNames?.description])}
          >
            {description}
          </FieldDescription>
        )}

        <FieldError className={classNames?.errorMessage}>{errorMessage}</FieldError>
      </div>
    </>
  );
}

function FieldLabelBlock(props: FieldShellProps) {
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
        className={classNames?.label}
      >
        {label}
      </Label>

      {description && descriptionPlacement === "top" && (
        <FieldDescription isDisabled={isDisabled} className={classNames?.description}>
          {description}
        </FieldDescription>
      )}
    </div>
  );
}

interface FieldDescriptionProps extends PropsWithChildren {
  isDisabled?: boolean;
  className?: string;
}

// HeroUI hides the description while the field is invalid; keep it visible next to the error.
function FieldDescription({ children, isDisabled, className }: FieldDescriptionProps) {
  return (
    <Description className={cn("block!", { "opacity-50": isDisabled }, className)}>
      {children}
    </Description>
  );
}

interface PlainFieldTextProps extends PropsWithChildren {
  id?: string;
  isDisabled?: boolean;
  className?: string;
}

/*
 * For controls whose React Aria component has no description/error slots (Slider, Switch), where
 * HeroUI's Description and FieldError render nothing. Link them to the control with `id`.
 */
function PlainFieldDescription({ id, children, isDisabled, className }: PlainFieldTextProps) {
  return (
    <span
      id={id}
      className={descriptionVariants({ className: cn({ "opacity-50": isDisabled }, className) })}
    >
      {children}
    </span>
  );
}

function PlainFieldError({ id, children, className }: PlainFieldTextProps) {
  return (
    <span
      id={id}
      role="alert"
      data-slot="field-error"
      data-visible
      className={fieldErrorVariants({ className })}
    >
      {children}
    </span>
  );
}

export {
  FieldShell,
  FieldDescription,
  PlainFieldDescription,
  PlainFieldError,
  fieldRootClassName,
  resolveInvalid,
  type FieldClassNames,
  type FieldProps,
};
