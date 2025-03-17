import {
  Field,
  NativeSelect,
  NativeSelectFieldProps,
  Box,
} from "@chakra-ui/react";
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
  obrigatorio?: boolean;
}

const SelectField = ({
  name,
  label,
  value,
  isLoading,
  options,
  labelColor,
  labelWeight,
  labelSize,
  obrigatorio,
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
        ref.current.value = newValue;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

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
        <NativeSelect.Root size="sm"
        id={fieldName}
        defaultValue={defaultValue}
        bg={bgColor}
        //disabled={isLoading ?? true}
        //invalid={!!error}
        >
          <NativeSelect.Field
          name={fieldName}
          value={value}
          /*placeholder={
            rest._disabled ? "Sem dados" : isLoading ? "Buscando dados..." : ""
          }*/
          ref={selectRef}
          {...rest}
          >
            {options.map((op) => (
              <option
                key={`select-${op.label}`}
                value={op.value}
                selected={op.value === defaultValue}
              >
                {op.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </Box>
  );
  /*
    return (
      <FormControl>
        {label && (
          <FormLabel
            color={labelColor}
            fontWeight={labelWeight}
            fontSize={labelSize}
            htmlFor={fieldName}
          >
            {label} {rest.isRequired || (obrigatorio && "*")}
          </FormLabel>
        )}
  
        <Select
          id={fieldName}
          name={fieldName}
          ref={selectRef}
          value={value}
          defaultValue={defaultValue}
          bg={bgColor}
          placeholder={
            rest.isDisabled ? "Sem dados" : isLoading ? "Buscando dados..." : ""
          }
          isDisabled={isLoading ?? rest.isDisabled}
          isInvalid={!!error}
          {...rest}
        >
          {options.map((op) => (
            <option
              key={`select-${op.label}`}
              value={op.value}
              selected={op.value === defaultValue}
            >
              {op.label}
            </option>
          ))}
        </Select>
  
        {error && <Text color="red.300">{error}</Text>}
      </FormControl>
    );
    */
};
export default SelectField;
