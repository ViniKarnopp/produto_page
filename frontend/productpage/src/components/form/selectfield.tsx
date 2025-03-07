import { NativeSelectFieldProps,NativeSelectIndicatorProps,NativeSelect,Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect,useRef } from "react";
import { useField } from "@unform/core";

interface Props {
    name: string,
    label : string,
    items: [{
        label: string,
        value: string
    }],
}


export function SelectField({ name,label,items, ...rest}: Props & NativeSelectFieldProps & NativeSelectIndicatorProps) {
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
                    {items.map((o: { value: string; label: string; }) => {
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