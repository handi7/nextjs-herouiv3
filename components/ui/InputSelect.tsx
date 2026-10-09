"use client";

import { ListBox, Select, SelectProps } from "@heroui/react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { type InputOption, renderListBoxOption } from "@/components/ui/ListBoxOption";
import { cn } from "@/lib/utils";

type InputSelectClassNames = FieldClassNames & {
  trigger?: string;
  popover?: string;
  item?: string;
};

export interface InputSelectProps
  extends Omit<SelectProps<InputOption>, "className" | "children" | "items">, FieldProps {
  options: InputOption[];
  showClear?: boolean;
  className?: string;
  classNames?: InputSelectClassNames;
}

function InputSelect(props: InputSelectProps) {
  const {
    isRequired,
    isDisabled,
    isInvalid,
    label,
    labelPlacement,
    description,
    descriptionPlacement,
    errorMessage,
    options,
    showClear,
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <Select
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
        <Select.Trigger className={cn("w-full", [classNames?.trigger])}>
          <Select.Value />
          {showClear && <Select.ClearButton />}
          <Select.Indicator />
        </Select.Trigger>
      </FieldShell>

      <Select.Popover className={classNames?.popover}>
        <ListBox items={options}>
          {(option) => renderListBoxOption(option, classNames?.item)}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export default InputSelect;
