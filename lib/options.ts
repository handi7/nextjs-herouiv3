import { ReactNode } from "react";

/** Option shape shared by select, combobox, checkbox group and radio group inputs. */
export type InputOption = {
  label: ReactNode;
  value: string;
  /** Helper text under the option (checkbox group, radio group). */
  description?: ReactNode;
  isDisabled?: boolean;
  /** Text used for search and typeahead when `label` isn't a string. */
  textValue?: string;
};

export function optionTextValue(option: InputOption) {
  if (option.textValue) {
    return option.textValue;
  }

  return typeof option.label === "string" ? option.label : option.value;
}
