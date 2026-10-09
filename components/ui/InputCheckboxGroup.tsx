"use client";

import { Checkbox, CheckboxGroup, CheckboxGroupProps } from "@heroui/react";

import {
  type FieldClassNames,
  FieldDescription,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { type InputOption } from "@/lib/options";
import { cn } from "@/lib/utils";

type InputCheckboxGroupClassNames = FieldClassNames & {
  list?: string;
  item?: string;
};

export interface InputCheckboxGroupProps
  extends Omit<CheckboxGroupProps, "children" | "className">, FieldProps {
  options: InputOption[];
  orientation?: "vertical" | "horizontal";
  className?: string;
  classNames?: InputCheckboxGroupClassNames;
}

function InputCheckboxGroup(props: InputCheckboxGroupProps) {
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
    orientation = "vertical",
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <CheckboxGroup
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
        <div
          className={cn("flex flex-col gap-3", [
            { "flex-row flex-wrap gap-x-6": orientation === "horizontal" },
            classNames?.list,
          ])}
        >
          {options.map((option) => (
            <Checkbox
              key={option.value}
              value={option.value}
              isDisabled={option.isDisabled}
              className={classNames?.item}
            >
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                {option.label}
              </Checkbox.Content>

              {option.description && <FieldDescription>{option.description}</FieldDescription>}
            </Checkbox>
          ))}
        </div>
      </FieldShell>
    </CheckboxGroup>
  );
}

export default InputCheckboxGroup;
