"use client";

import {
  Calendar,
  DateField,
  DatePicker as HeroDatePicker,
  DatePickerProps as HeroDatePickerProps,
} from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { fromDateValue, toCalendarDate, toPickerValue } from "@/lib/dates";

type DateValueProps = "value" | "defaultValue" | "onChange" | "minValue" | "maxValue";

export interface DatePickerProps
  extends
    Omit<HeroDatePickerProps<CalendarDate>, DateValueProps | "children" | "className">,
    FieldProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date | null) => void;
  minValue?: Date;
  maxValue?: Date;
  className?: string;
  classNames?: FieldClassNames & {
    group?: string;
    popover?: string;
  };
}

/** Date input with a calendar popover. Takes and returns JS `Date` (local midnight). */
function DatePicker(props: DatePickerProps) {
  const {
    isRequired,
    isDisabled,
    isInvalid,
    label,
    labelPlacement,
    description,
    descriptionPlacement,
    errorMessage,
    value,
    defaultValue,
    onChange,
    minValue,
    maxValue,
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <HeroDatePicker<CalendarDate>
      {...rest}
      value={toPickerValue(value)}
      defaultValue={toPickerValue(defaultValue)}
      onChange={(next) => onChange?.(next ? fromDateValue(next) : null)}
      minValue={minValue && toCalendarDate(minValue)}
      maxValue={maxValue && toCalendarDate(maxValue)}
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
        <DateField.Group fullWidth className={classNames?.group}>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <HeroDatePicker.Trigger>
              <HeroDatePicker.TriggerIndicator />
            </HeroDatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
      </FieldShell>

      <HeroDatePicker.Popover className={classNames?.popover}>
        <Calendar aria-label={label}>
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </HeroDatePicker.Popover>
    </HeroDatePicker>
  );
}

export default DatePicker;
