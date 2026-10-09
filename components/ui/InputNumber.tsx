"use client";

import { NumberField, NumberFieldProps } from "@heroui/react";
import { inputGroupVariants } from "@heroui/styles";
import { ReactNode } from "react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { cn } from "@/lib/utils";

type InputNumberClassNames = FieldClassNames & {
  inputGroup?: string;
  input?: string;
  incrementButton?: string;
  decrementButton?: string;
};

export interface InputNumberProps extends Omit<NumberFieldProps, "className">, FieldProps {
  className?: string;
  classNames?: InputNumberClassNames;
  startContent?: ReactNode;
  endContent?: ReactNode;
  hideStepper?: boolean;
  placeholder?: string;
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
    startContent,
    endContent,
    hideStepper,
    placeholder,
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
        <NumberGroup
          startContent={startContent}
          endContent={endContent}
          hideStepper={hideStepper}
          placeholder={placeholder}
          classNames={classNames}
        />
      </FieldShell>
    </NumberField>
  );
}

// InputGroup.Prefix/Suffix read their classes from InputGroup's context, which a NumberField
// group doesn't provide, so the slot classes are applied to plain elements instead.
const addonSlots = inputGroupVariants();

type NumberGroupProps = Pick<
  InputNumberProps,
  "startContent" | "endContent" | "hideStepper" | "placeholder" | "classNames"
>;

/**
 * HeroUI sizes the group's grid columns from the stepper buttons only, so the columns are set
 * here to make room for start/end content.
 */
function groupColumns({ startContent, endContent, hideStepper }: NumberGroupProps) {
  const stepper = hideStepper ? [] : ["40px"];
  const start = startContent ? ["auto"] : [];
  const end = endContent ? ["auto"] : [];

  return [...stepper, ...start, "1fr", ...end, ...stepper].join(" ");
}

function NumberGroup(props: NumberGroupProps) {
  const { startContent, endContent, hideStepper, placeholder, classNames } = props;

  return (
    <NumberField.Group
      className={classNames?.inputGroup}
      style={{ gridTemplateColumns: groupColumns(props) }}
    >
      {!hideStepper && <NumberField.DecrementButton className={classNames?.decrementButton} />}

      {startContent && <div className={addonSlots.prefix()}>{startContent}</div>}

      <NumberField.Input placeholder={placeholder} className={cn("w-full", [classNames?.input])} />

      {endContent && <div className={addonSlots.suffix()}>{endContent}</div>}

      {!hideStepper && <NumberField.IncrementButton className={classNames?.incrementButton} />}
    </NumberField.Group>
  );
}

export default InputNumber;
