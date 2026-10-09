"use client";

import { NumberField, NumberFieldProps } from "@heroui/react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputNumberProps extends Omit<NumberFieldProps, "className">, FieldProps {
  className?: string;
  classNames?: FieldClassNames & {
    inputGroup?: string;
    input?: string;
    incrementButton?: string;
    decrementButton?: string;
  };
}

function InputNumber(props: InputNumberProps) {
  const {
    isRequired,
    isDisabled,
    isInvalid,
    label,
    labelPlacement,
    description,
    descriptionPlacement,
    errorMessage,
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <NumberField
      {...rest}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={invalid}
      className={fieldRootClassName(labelPlacement, classNames?.base, className)}
    >
      <FieldShell
        label={label}
        labelPlacement={labelPlacement}
        description={description}
        descriptionPlacement={descriptionPlacement}
        errorMessage={errorMessage}
        isRequired={isRequired}
        isDisabled={isDisabled}
        isInvalid={invalid}
        classNames={classNames}
      >
        <NumberField.Group className={cn("rounded-lg", [classNames?.inputGroup])}>
          <NumberField.DecrementButton className={classNames?.decrementButton} />
          <NumberField.Input className={cn("w-full", [classNames?.input])} />
          <NumberField.IncrementButton className={classNames?.incrementButton} />
        </NumberField.Group>
      </FieldShell>
    </NumberField>
  );
}

export default InputNumber;
