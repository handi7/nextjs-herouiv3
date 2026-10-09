"use client";

import { I18nProvider } from "@heroui/react";

import InputNumber, { type InputNumberProps } from "@/components/ui/InputNumber";

export interface InputFormattedNumberProps extends InputNumberProps {
  /** Locale used to format and parse the number. `id-ID` → `1.250.000,5`. */
  locale?: string;
  maximumFractionDigits?: number;
  allowNegative?: boolean;
}

/**
 * InputNumber with thousand separators and locale-aware parsing. Formatting is done by
 * HeroUI's NumberField (Intl.NumberFormat); `formatOptions` can still override it.
 */
function InputFormattedNumber(props: InputFormattedNumberProps) {
  const {
    locale = "id-ID",
    maximumFractionDigits = 2,
    allowNegative = false,
    hideStepper = true,
    minValue,
    formatOptions,
    ...rest
  } = props;

  return (
    <I18nProvider locale={locale}>
      <InputNumber
        {...rest}
        hideStepper={hideStepper}
        minValue={allowNegative ? minValue : (minValue ?? 0)}
        formatOptions={{ maximumFractionDigits, useGrouping: true, ...formatOptions }}
      />
    </I18nProvider>
  );
}

export default InputFormattedNumber;
