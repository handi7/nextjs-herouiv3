"use client";

import { TextArea, TextAreaProps, TextField } from "@heroui/react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputTextareaProps extends Omit<TextAreaProps, "className">, FieldProps {
  className?: string;
  classNames?: FieldClassNames & {
    textarea?: string;
  };
}

function InputTextarea(props: InputTextareaProps) {
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
        <TextArea {...rest} className={cn("w-full rounded-lg", [classNames?.textarea])} />
      </FieldShell>
    </TextField>
  );
}

export default InputTextarea;
