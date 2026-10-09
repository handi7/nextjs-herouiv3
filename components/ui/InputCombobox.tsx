"use client";

import { ComboBox, ComboBoxProps, EmptyState, Input, ListBox } from "@heroui/react";
import { ReactNode } from "react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { type InputOption, renderListBoxOption } from "@/components/ui/ListBoxOption";
import { cn } from "@/lib/utils";

type InputComboboxClassNames = FieldClassNames & {
  inputGroup?: string;
  input?: string;
  popover?: string;
  item?: string;
};

export interface InputComboboxProps
  extends
    Omit<ComboBoxProps<InputOption>, "className" | "children" | "items" | "defaultItems">,
    FieldProps {
  options: InputOption[];
  placeholder?: string;
  emptyMessage?: ReactNode;
  className?: string;
  classNames?: InputComboboxClassNames;
}

function InputCombobox(props: InputComboboxProps) {
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
    placeholder,
    emptyMessage = "No results found.",
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <ComboBox
      allowsEmptyCollection
      {...rest}
      defaultItems={options}
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
        <ComboBox.InputGroup className={cn("rounded-lg", [classNames?.inputGroup])}>
          <Input placeholder={placeholder} className={cn("w-full", [classNames?.input])} />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
      </FieldShell>

      <ComboBox.Popover className={classNames?.popover}>
        <ListBox renderEmptyState={() => <EmptyState>{emptyMessage}</EmptyState>}>
          {(option: InputOption) => renderListBoxOption(option, classNames?.item)}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

export default InputCombobox;
