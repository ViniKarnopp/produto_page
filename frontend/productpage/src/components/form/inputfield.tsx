import { InputProps, Input, Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useRef } from "react";
import { useField } from "@unform/core";

interface Props {
  name: string,
  label: string,
}

export function InputField({ name, label, ...rest }: InputProps & Props) {
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
