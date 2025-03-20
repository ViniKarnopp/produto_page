import { InputProps, Input, Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface Props extends InputProps {
  name: string,
  label: string,
}

//Campo de Input para formulários usando o Unform e Chakra UI
export function InputField({ name, label, ...rest }: Props) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Box>
      <Field label={label} invalid={!!error} errorText={error}>
        <Input
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </Field>
    </Box>
  );
}
