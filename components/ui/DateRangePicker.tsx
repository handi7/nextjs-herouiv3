"use client";

import {
  DateField,
  DateRangePicker as HeroDateRangePicker,
  DateRangePickerProps as HeroDateRangePickerProps,
  RangeCalendar,
} from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import { type DateRange, fromPickerRange, toCalendarDate, toPickerRange } from "@/lib/dates";

type DateValueProps = "value" | "defaultValue" | "onChange" | "minValue" | "maxValue";

export interface DateRangePickerProps
  extends
    Omit<HeroDateRangePickerProps<CalendarDate>, DateValueProps | "children" | "className">,
    FieldProps {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  minValue?: Date;
  maxValue?: Date;
  className?: string;
  classNames?: FieldClassNames & {
    group?: string;
    popover?: string;
  };
}

/** Start/end date input with a range calendar popover. Takes and returns JS `Date`s. */
function DateRangePicker(props: DateRangePickerProps) {
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
    <HeroDateRangePicker<CalendarDate>
      {...rest}
      value={toPickerRange(value)}
      defaultValue={toPickerRange(defaultValue)}
      onChange={(next) => onChange?.(fromPickerRange(next))}
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
          <DateField.Input slot="start">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <HeroDateRangePicker.RangeSeparator />
          <DateField.Input slot="end">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <HeroDateRangePicker.Trigger>
              <HeroDateRangePicker.TriggerIndicator />
            </HeroDateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
      </FieldShell>

      <HeroDateRangePicker.Popover className={classNames?.popover}>
        <RangeCalendar aria-label={label}>
          <RangeCalendar.Header>
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading />
              <RangeCalendar.YearPickerTriggerIndicator />
            </RangeCalendar.YearPickerTrigger>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
          <RangeCalendar.YearPickerGrid>
            <RangeCalendar.YearPickerGridBody>
              {({ year }) => <RangeCalendar.YearPickerCell year={year} />}
            </RangeCalendar.YearPickerGridBody>
          </RangeCalendar.YearPickerGrid>
        </RangeCalendar>
      </HeroDateRangePicker.Popover>
    </HeroDateRangePicker>
  );
}

export default DateRangePicker;
