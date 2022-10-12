import {
  Box,
  BoxProps,
  FormControl,
  FormErrorMessage,
  Icon,
} from "@highoutput/ui-components";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Select, { MultiValue, SingleValue } from "react-select";
import FieldLabel from "@/components/forms/field-label";
import getStyles from "@/components/forms/auto-complete/styles";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export interface Item {
  value: string | number;
  label: string;
}

export interface DropDownProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  error?: string;
  items: Item[];
  isLastStep?: boolean;
  loading?: boolean;
  control: Control<T>;
  isDisabled?: boolean;
  selectedProps?: Omit<BoxProps, "children">;
  fieldLabelProps?: Omit<BoxProps, "children">;
  required?: boolean;
  ariaLabel?: string;
  placement?: "auto" | "top" | "bottom";
  multiple?: boolean;
  placeholder?: string;
}

export default function AutoComplete<T extends FieldValues>({
  name,
  label,
  error,
  items,
  placement,
  control,
  ariaLabel,
  isLastStep,
  selectedProps,
  fieldLabelProps,
  required,
  multiple,
  isDisabled,
  loading,
  placeholder,
}: DropDownProps<T> & BoxProps) {
  const styles = getStyles({ multiple, error: !!error, lastStep: isLastStep });

  return (
    <Box>
      {label && (
        <FieldLabel label={label} {...fieldLabelProps} required={required} />
      )}
      <Box {...selectedProps}>
        <FormControl isInvalid={!!error}>
          <Controller
            name={name}
            control={control}
            render={({
              field: { value, onChange, onBlur, name: fieldName },
            }) => {
              return (
                <Select
                  options={items}
                  instanceId={fieldName}
                  styles={styles}
                  placeholder={placeholder}
                  menuPlacement={placement ?? "auto"}
                  isMulti={multiple}
                  captureMenuScroll
                  backspaceRemovesValue
                  isLoading={loading}
                  isSearchable
                  aria-label={ariaLabel}
                  isDisabled={isDisabled}
                  isClearable
                  components={{
                    ClearIndicator: () => null,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: (props) => {
                      const icon = props.selectProps.menuIsOpen
                        ? FiChevronUp
                        : FiChevronDown;

                      return (
                        <Icon as={icon} w={4} h={6} mr={3} stroke="#6B7280" />
                      );
                    },
                  }}
                  onChange={(
                    options: MultiValue<Item> | (SingleValue<Item> | null)
                  ) => {
                    if (isArray<MultiValue<Item>>(options))
                      onChange(options.map((o) => o.value));
                    else onChange(options?.value ?? null);
                  }}
                  onBlur={onBlur}
                  value={items.filter((option) => {
                    return Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;
                  })}
                  defaultValue={items.filter((item) => {
                    return Array.isArray(value)
                      ? value.includes(item.value)
                      : value === item.value;
                  })}
                />
              );
            }}
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </Box>
    </Box>
  );
}

function isArray<T>(subject: unknown): subject is T {
  return Array.isArray(subject);
}
