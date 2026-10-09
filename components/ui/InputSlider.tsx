"use client";

import { Label, Slider, SliderProps } from "@heroui/react";
import { useId } from "react";

import { PlainFieldDescription, PlainFieldError, resolveInvalid } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

export interface InputSliderProps extends Omit<SliderProps, "children" | "className"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  /** Shows `errorMessage`. Sliders have no built-in validation. */
  isInvalid?: boolean;
  isRequired?: boolean;
  /** Shows the current value (or range) next to the label. */
  showValue?: boolean;
  className?: string;
  classNames?: {
    base?: string;
    header?: string;
    label?: string;
    value?: string;
    track?: string;
    description?: string;
    errorMessage?: string;
  };
}

function InputSlider(props: InputSliderProps) {
  const {
    isDisabled,
    isInvalid,
    isRequired,
    label,
    description,
    errorMessage,
    showValue,
    className,
    classNames,
    ...rest
  } = props;

  const id = useId();
  const showError = resolveInvalid(isInvalid, errorMessage) && Boolean(errorMessage);
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = showError ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <Slider
      {...rest}
      isDisabled={isDisabled}
      aria-describedby={describedBy}
      className={cn("flex w-full flex-col gap-2", [classNames?.base, className])}
    >
      <SliderHeader
        label={label}
        showValue={showValue}
        isRequired={isRequired}
        isDisabled={isDisabled}
        classNames={classNames}
      />

      <Slider.Track className={classNames?.track}>
        {({ state }) => (
          <>
            <Slider.Fill />
            {state.values.map((_, index) => (
              <Slider.Thumb key={index} index={index} />
            ))}
          </>
        )}
      </Slider.Track>

      {description && (
        <PlainFieldDescription
          id={descriptionId}
          isDisabled={isDisabled}
          className={cn("px-1", [classNames?.description])}
        >
          {description}
        </PlainFieldDescription>
      )}

      {showError && (
        <PlainFieldError id={errorId} className={classNames?.errorMessage}>
          {errorMessage}
        </PlainFieldError>
      )}
    </Slider>
  );
}

type SliderHeaderProps = Pick<
  InputSliderProps,
  "label" | "showValue" | "isRequired" | "isDisabled" | "classNames"
>;

function SliderHeader({ label, showValue, isRequired, isDisabled, classNames }: SliderHeaderProps) {
  if (!label && !showValue) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-between gap-2", [classNames?.header])}>
      {label && (
        <Label isRequired={isRequired} isDisabled={isDisabled} className={classNames?.label}>
          {label}
        </Label>
      )}
      {showValue && <Slider.Output className={cn("ms-auto", [classNames?.value])} />}
    </div>
  );
}

export default InputSlider;
