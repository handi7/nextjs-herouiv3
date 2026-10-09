"use client";

import { InputGroup, InputProps, TextField } from "@heroui/react";
import { ReactNode } from "react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputTextProps extends Omit<InputProps, "className">, FieldProps {
  className?: string;
  classNames?: FieldClassNames & {
    inputGroup?: string;
    input?: string;
  };
  startContent?: ReactNode;
  endContent?: ReactNode;
}

function InputText(props: InputTextProps) {
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
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <TextField
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
        <InputGroup className={cn("rounded-lg", [classNames?.inputGroup])}>
          {startContent && <InputGroup.Prefix>{startContent}</InputGroup.Prefix>}

          <InputGroup.Input {...rest} className={cn("w-full", [classNames?.input])} />

          {endContent && <InputGroup.Suffix>{endContent}</InputGroup.Suffix>}
        </InputGroup>
      </FieldShell>
    </TextField>
  );
}

export default InputText;
