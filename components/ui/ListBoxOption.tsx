"use client";

import { ListBox } from "@heroui/react";
import { ReactNode } from "react";

/** Option shape shared by InputSelect, InputCombobox and InputComboboxMultiple. */
type InputOption = {
  label: ReactNode;
  value: string;
  isDisabled?: boolean;
  /** Text used for search and typeahead when `label` isn't a string. */
  textValue?: string;
};

function optionTextValue(option: InputOption) {
  if (option.textValue) {
    return option.textValue;
  }

  return typeof option.label === "string" ? option.label : option.value;
}

/** Renders one option as a ListBox item. Use as the ListBox's item render function. */
function renderListBoxOption(option: InputOption, className?: string) {
  return (
    <ListBox.Item
      id={option.value}
      textValue={optionTextValue(option)}
      isDisabled={option.isDisabled}
      className={className}
    >
      {option.label}
      <ListBox.ItemIndicator />
    </ListBox.Item>
  );
}

export { optionTextValue, renderListBoxOption, type InputOption };
