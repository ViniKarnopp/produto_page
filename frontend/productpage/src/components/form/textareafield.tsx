import {  TextareaProps,Textarea,Box } from "@chakra-ui/react";
import { Field } from "@/components/ui/field"
import { useEffect,useRef } from "react";
import { useField } from "@unform/core";

interface Props extends TextareaProps {
    name: string,
    label : string,
}

//Campo Textarea com Chackra UI e Unform.
export function TextareaField({ name,label, ...rest}: Props) {
    const textRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textRef.current,
            path: 'value'
        })
    },[fieldName,registerField]);

    return (
    <Box>
        <Field label={label} invalid={!!error} errorText={error}>
            <Textarea id={fieldName} ref={textRef} defaultValue={defaultValue} {...rest}/>
        </Field>
    </Box>
    );
}