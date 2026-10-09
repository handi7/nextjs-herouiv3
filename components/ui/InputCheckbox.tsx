"use client";

import { Checkbox, CheckboxProps, FieldError, Label } from "@heroui/react";

import { FieldDescription, resolveInvalid } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputCheckboxProps extends Omit<CheckboxProps, "children" | "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
  classNames?: {
    base?: string;
    content?: string;
    control?: string;
    label?: string;
    description?: string;
    errorMessage?: string;
  };
}

function InputCheckbox(props: InputCheckboxProps) {
  const {
    isRequired,
    isDisabled,
    isInvalid,
    label,
    description,
    errorMessage,
    className,
    classNames,
    ...rest
  } = props;

  return (
    <Checkbox
      {...rest}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={resolveInvalid(isInvalid, errorMessage)}
      className={cn([classNames?.base, className])}
    >
      <Checkbox.Content className={classNames?.content}>
        <Checkbox.Control className={classNames?.control}>
          <Checkbox.Indicator />
        </Checkbox.Control>

        {label && (
          <Label isRequired={isRequired} className={classNames?.label}>
            {label}
          </Label>
        )}
      </Checkbox.Content>

      {description && (
        <FieldDescription isDisabled={isDisabled} className={classNames?.description}>
          {description}
        </FieldDescription>
      )}

      <FieldError className={classNames?.errorMessage}>{errorMessage}</FieldError>
    </Checkbox>
  );
}

export default InputCheckbox;
