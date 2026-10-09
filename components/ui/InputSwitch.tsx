"use client";

import { Label, Switch, SwitchProps } from "@heroui/react";
import { useId } from "react";

import { FieldDescription, PlainFieldError, resolveInvalid } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputSwitchProps extends Omit<SwitchProps, "children" | "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  /** Shows `errorMessage`. Switches have no built-in validation. */
  isInvalid?: boolean;
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

function InputSwitch(props: InputSwitchProps) {
  const {
    isDisabled,
    isInvalid,
    label,
    description,
    errorMessage,
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);
  const errorId = useId();
  const showError = invalid && Boolean(errorMessage);

  return (
    <Switch
      {...rest}
      isDisabled={isDisabled}
      aria-describedby={showError ? errorId : undefined}
      data-invalid={invalid || undefined}
      className={cn([classNames?.base, className])}
    >
      <Switch.Content className={classNames?.content}>
        <Switch.Control className={classNames?.control}>
          <Switch.Thumb />
        </Switch.Control>

        {label && <Label className={classNames?.label}>{label}</Label>}
      </Switch.Content>

      {description && (
        <FieldDescription isDisabled={isDisabled} className={classNames?.description}>
          {description}
        </FieldDescription>
      )}

      {/* React Aria's Switch has no validation context, so FieldError would never render. */}
      {showError && (
        <PlainFieldError id={errorId} className={classNames?.errorMessage}>
          {errorMessage}
        </PlainFieldError>
      )}
    </Switch>
  );
}

export default InputSwitch;
