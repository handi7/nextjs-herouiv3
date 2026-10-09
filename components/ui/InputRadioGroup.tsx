"use client";

import { Radio, RadioGroup, RadioGroupProps } from "@heroui/react";

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

type InputRadioGroupClassNames = FieldClassNames & {
  list?: string;
  item?: string;
};

export interface InputRadioGroupProps
  extends Omit<RadioGroupProps, "children" | "className">, FieldProps {
  options: InputOption[];
  className?: string;
  classNames?: InputRadioGroupClassNames;
}

function InputRadioGroup(props: InputRadioGroupProps) {
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
    <RadioGroup
      {...rest}
      orientation={orientation}
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
            <Radio
              key={option.value}
              value={option.value}
              isDisabled={option.isDisabled}
              className={classNames?.item}
            >
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                {option.label}
              </Radio.Content>

              {option.description && <FieldDescription>{option.description}</FieldDescription>}
            </Radio>
          ))}
        </div>
      </FieldShell>
    </RadioGroup>
  );
}

export default InputRadioGroup;
