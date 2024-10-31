import TextInput, { TextInputProps } from "./TextInput"
import Text, { TextProps } from "./../Text"
import Textarea, { TextareaProps } from "./Textarea"

import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { BoxProps } from "props/box";
import { DashBaseProps, PersistenceProps } from "props/dash";
import { __BaseInputProps } from "props/input";
import { StylesApiProps } from "props/styles";
import React, { useEffect, useState } from "react";
import { is } from "ramda";

interface Props
    extends BoxProps,
        DashBaseProps {
    /** Value for controlled input */
    value?: string;
    /** Defines if the component is in edit mode or not. Defaults to `False`  */
    isEditting?: boolean;
    //** Defines if the component shows `Textarea` in edit mode. Defaults to `False` (i.e., default is `Text`) */
    editIsTextarea?: boolean;
    /** Props handed down to `Text` component */
    textProps?: Omit<TextProps, "children">;
    /** Props handed down to `Textarea` component */
    textareaProps?: Omit<TextareaProps, "value">;
    /** Props handed down to `TextInput` component */
    textInputProps?: Omit<TextInputProps, "value">;
}

/** TextInput */
const EditableText = (props: Props) => {
    const {
        setProps,
        loading_state,
        value:initialValue,
        isEditting:initialIsEditting,
        textProps,
        editIsTextarea,
        textareaProps,
        textInputProps,
        ...others
    } = props;

    const [value, setValue] = useState(initialValue)
    const [isEditting, setIsEditting] = useState(initialIsEditting)

    useEffect(() => {
        console.log("Change detected");
        setIsEditting(initialIsEditting)
    }, [initialIsEditting]);

    const handleDoubleClick =  () => {
        setIsEditting(true)
    }

    const handleOnBlur =() => {
        setIsEditting(false)
    }

    const handleValueChange = (newValue) => {
        setValue(newValue)
    }

    return (
        <div
            data-dash-is-loading={
                (loading_state && loading_state.is_loading) || undefined
            }
        >
            {
                !isEditting ? (
                    <div
                        onDoubleClick={handleDoubleClick}
                        onBlur={handleOnBlur}
                    >
                        <Text
                            {...textProps}
                            children={value}
                        />
                    </div>
                ) : editIsTextarea ? (
                    <Textarea
                        {...textareaProps}
                        value={value}
                        setProps={({ value }) => handleValueChange(value)}
                    />
                ) : (
                    <TextInput
                        {...textInputProps}
                        value={value}
                        setProps={({ value }) => handleValueChange(value)}
                    />
                )
            }
        </div>
    );
};

EditableText.defaultProps = {
    isEditting: false,
    editIsTextarea: false,
};

export default EditableText;
