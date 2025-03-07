import { NativeSelectFieldProps,NativeSelect,Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect,useRef } from "react";
import { useField } from "@unform/core";

interface Props extends NativeSelectFieldProps {
    name: string,
    label : string,
    options: [{
        label: string,
        value: string
    }],
}


export function SelectField({ name,label,options, ...rest}: Props) {
    const selectRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'value'
        })
    },[fieldName,registerField]);

    return (
    <Box>
        <Field label={label} invalid={!!error} errorText={error}>
            <NativeSelect.Root>
                <NativeSelect.Field name={name} defaultValue={defaultValue} {...rest}>
                    {options.map((o) => {
                        return (
                            <option value={o.value}>{o.label}</option>
                        );
                    })}
                </NativeSelect.Field>
                <NativeSelect.Indicator/>
            </NativeSelect.Root>
        </Field>
    </Box>
    );
}