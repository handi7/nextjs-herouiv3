"use client";

import { ListBox } from "@heroui/react";

import { type InputOption, optionTextValue } from "@/lib/options";

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

export { renderListBoxOption };
