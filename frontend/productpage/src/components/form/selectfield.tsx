import { Field, Select, NativeSelectFieldProps, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useField } from "@unform/core";
import { useEffect, useRef } from "react";

export interface SelectOption {
  value: any;
  label: string;
}

export interface CustomSelectProps extends NativeSelectFieldProps {
  name: string;
  options: SelectOption[];
  value?: string;
  label?: string;
  labelColor?: string;
  labelWeight?: string;
  labelSize?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  obrigatorio?: boolean;
}

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

  // Set the value when it changes externally
  useEffect(() => {
    if (selectRef.current && value !== undefined) {
      selectRef.current.value = value;
    }
  }, [value]);

  const bgColor = useColorModeValue("white", "gray.900");

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
        <select
          id={fieldName}
          name={fieldName}
          ref={selectRef}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          style={{
            background: "#F5F5F5",
            border: "1px solid #E6E6E6",
            borderRadius: "15px",
          }}
          
          disabled={isLoading ?? isDisabled}
        >
          <option value="" disabled selected hidden>
            {isDisabled ? "Sem dados" : isLoading ? "Buscando dados..." : "Selecione"}
          </option>
          {options.map((op) => (
            <option key={`select-${op.label}`} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </Field.Root>
    </Box>
  );
};

export default SelectField;
