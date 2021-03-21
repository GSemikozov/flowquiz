import { useCallback, useState } from "react";

export const useEditableText = (initValue: string) => {
    const [text, setText] = useState(initValue || "");
    const [editMode, setEditMode] = useState(false);

    const handleChange = (event: { target: { name: any; value: any } }) => {
        setText(event.target.value);
    };

    const handleMouseOver = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    const handleMouseOut = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    const handleOnFocus = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    const handleOnBlur = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    const handleDoubleClick = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    const toggleEditMode = useCallback(() => {
        setEditMode((prev) => !prev);
    }, []);

    return {
        handleChange,
        handleMouseOver,
        handleMouseOut,
        handleOnBlur,
        handleOnFocus,
        handleDoubleClick,
        toggleEditMode,
        text,
        editMode,
    };
};
