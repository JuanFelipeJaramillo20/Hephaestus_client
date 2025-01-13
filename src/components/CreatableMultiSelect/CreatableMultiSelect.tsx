import React, { useState } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  Input,
  useCombobox,
} from "@mantine/core";

interface MultiSelectCreatableProps {
  initialData: { value: string; label: string }[];
  onChange: (selected: { value: string; label: string }[]) => void;
  label?: string; // Optional label
}

export function MultiSelectCreatable({
                                       initialData,
                                       onChange,
                                       label,
                                     }: MultiSelectCreatableProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [value, setValue] = useState<{ value: string; label: string }[]>([]);

  const exactOptionMatch = data.some((item) => item.label === search);

  const handleValueSelect = (val: string) => {
    setSearch("");

    if (val === "$create") {
      const newItem = { value: search, label: search };
      setData((current) => [...current, newItem]);
      setValue((current) => [...current, newItem]);
      onChange([...value, newItem]); // Notify parent of changes
    } else {
      const selectedItem = data.find((item) => item.value === val);
      if (selectedItem) {
        const updatedValues = value.includes(selectedItem)
          ? value.filter((v) => v.value !== selectedItem.value)
          : [...value, selectedItem];
        setValue(updatedValues);
        onChange(updatedValues); // Notify parent of changes
      }
    }
  };

  const handleValueRemove = (val: string) => {
    const updatedValues = value.filter((item) => item.value !== val);
    setValue(updatedValues);
    onChange(updatedValues); // Notify parent of changes
  };

  const values = value.map((item) => (
    <Pill key={item.value} withRemoveButton onRemove={() => handleValueRemove(item.value)}>
      {item.label}
    </Pill>
  ));

  const options = data
    .filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item.value} key={item.value} active={value.includes(item)}>
        <Group gap="sm">
          {value.some((v) => v.value === item.value) ? <CheckIcon size={12} /> : null}
          <span>{item.label}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Input.Wrapper label={label} mt="md">
      <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
        <Combobox.DropdownTarget>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {values}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Search values"
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Backspace" && search.length === 0) {
                      event.preventDefault();
                      handleValueRemove(value[value.length - 1]?.value);
                    }
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.DropdownTarget>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
            )}

            {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Input.Wrapper>
  );
}
