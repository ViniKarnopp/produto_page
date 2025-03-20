import {
  Field,
  Select,
  Portal,
  NativeSelectFieldProps,
  createListCollection,
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps extends NativeSelectFieldProps {
  name: string;
  options: SelectOption[];
  value?: string[];
  label?: string;
  labelColor?: string;
  labelWeight?: string;
  labelSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  obrigatorio?: boolean;
}

//Campo de select com chakra e unform.
const SelectField = ({
  name,
  label,
  value,
  isLoading,
  isDisabled,
  options,
  labelColor,
  labelWeight,
  labelSize,
  obrigatorio,
  onChange,
  ...rest
}: CustomSelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const {
    fieldName,
    defaultValue = rest.defaultValue,
    registerField,
    error,
  } = useField(name);

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: (ref) => {
        return ref.current?.value;
      },
      setValue: (ref, newValue) => {
        if (ref.current) ref.current.value = newValue;
      },
      clearValue: (ref) => {
        if (ref.current) ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (selectRef.current && value && Array.isArray(value) && value.length > 0) {
      selectRef.current.value = value[0];
    }
  }, [value]);

  const bgColor = useColorModeValue("white", "gray.900");
  const campos = createListCollection({ items: options });

  return (
    <Box>
      <Field.Root>
        {label && (
          <Field.Label
            color={labelColor}
            fontWeight={labelWeight}
            fontSize={labelSize}
            htmlFor={fieldName}
          >
            {label} {rest._required ? "*" : obrigatorio ? "*" : ""}
          </Field.Label>
        )}
        <Select.Root
          collection={campos}
          size="sm"
          id={fieldName}
          name={fieldName}
          value={value} 
          defaultValue={defaultValue}
          disabled={isLoading || isDisabled}
          width={rest.width}
        >
          <Select.HiddenSelect ref={selectRef} onChange={onChange}  />
          <Select.Control
            style={{
              background: "#F5F5F5",
              border: "1px solid #E6E6E6",
              borderRadius: "15px",
            }}
          >
            <Select.Trigger>
              <Select.ValueText
                placeholder={
                  isDisabled
                    ? "Sem dados"
                    : isLoading
                    ? "Buscando dados..."
                    : "Selecione"
                }
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {campos.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Field.Root>
    </Box>
  );
};

export default SelectField;
