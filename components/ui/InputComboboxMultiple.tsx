"use client";

import {
  ComboBox,
  ComboBoxProps,
  EmptyState,
  Input,
  type Key,
  ListBox,
  Tag,
  TagGroup,
} from "@heroui/react";
import { ReactNode } from "react";

import {
  type FieldClassNames,
  type FieldProps,
  FieldShell,
  fieldRootClassName,
  resolveInvalid,
} from "@/components/ui/Field";
import {
  type InputOption,
  optionTextValue,
  renderListBoxOption,
} from "@/components/ui/ListBoxOption";
import { cn } from "@/lib/utils";

type InputComboboxMultipleClassNames = FieldClassNames & {
  inputGroup?: string;
  input?: string;
  tags?: string;
  tag?: string;
  popover?: string;
  item?: string;
};

export interface InputComboboxMultipleProps
  extends
    Omit<
      ComboBoxProps<InputOption, "multiple">,
      "className" | "children" | "items" | "defaultItems" | "selectionMode"
    >,
    FieldProps {
  options: InputOption[];
  placeholder?: string;
  emptyMessage?: ReactNode;
  className?: string;
  classNames?: InputComboboxMultipleClassNames;
}

function InputComboboxMultiple(props: InputComboboxMultipleProps) {
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
    placeholder,
    emptyMessage = "No results found.",
    className,
    classNames,
    ...rest
  } = props;

  const invalid = resolveInvalid(isInvalid, errorMessage);

  return (
    <ComboBox
      allowsEmptyCollection
      {...rest}
      selectionMode="multiple"
      defaultItems={options}
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
        <ComboBox.InputGroup className={classNames?.inputGroup}>
          <Input placeholder={placeholder} className={cn("w-full", [classNames?.input])} />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>

        <ComboBox.Value className={cn("empty:hidden", [classNames?.tags])}>
          {({ selectedItems, state }) => (
            <SelectedTags
              items={selectedItems as (InputOption | null)[]}
              isDisabled={isDisabled}
              tagClassName={classNames?.tag}
              onRemove={(keys) => state.setValue(withoutKeys(state.value, keys))}
            />
          )}
        </ComboBox.Value>
      </FieldShell>

      <ComboBox.Popover className={classNames?.popover}>
        <ListBox
          selectionMode="multiple"
          renderEmptyState={() => <EmptyState>{emptyMessage}</EmptyState>}
        >
          {(option: InputOption) => renderListBoxOption(option, classNames?.item)}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

// The render props type the ComboBox state for both selection modes; this one is always multiple.
function withoutKeys(value: Key | readonly Key[] | null, keys: Set<Key>) {
  return Array.isArray(value) ? value.filter((key) => !keys.has(key)) : [];
}

interface SelectedTagsProps {
  items: (InputOption | null)[];
  isDisabled?: boolean;
  tagClassName?: string;
  onRemove: (keys: Set<Key>) => void;
}

/** Selected options as removable tags. Renders nothing when nothing is selected. */
function SelectedTags({ items, isDisabled, tagClassName, onRemove }: SelectedTagsProps) {
  const selected = items.filter((item): item is InputOption => item !== null);

  if (selected.length === 0) {
    return null;
  }

  return (
    <TagGroup aria-label="Selected options" onRemove={isDisabled ? undefined : onRemove}>
      <TagGroup.List items={selected}>
        {(option) => (
          <Tag id={option.value} textValue={optionTextValue(option)} className={tagClassName}>
            {option.label}
          </Tag>
        )}
      </TagGroup.List>
    </TagGroup>
  );
}

export default InputComboboxMultiple;
