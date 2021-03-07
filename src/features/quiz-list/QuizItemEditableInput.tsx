import React, { Dispatch, SetStateAction, useRef } from "react";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        minWidth: 240,
        maxWidth: "100%",
        color: "black",
        opacity: 1,
        borderBottom: 0,
        boxSizing: "border-box",
        "&:before": {
            borderBottom: "0 !important",
        },
    },
}));

export const QuizItemEditableInput = ({
    name,
    title,
    saveToDb,
}: {
    name: string;
    title: string;
    saveToDb: Dispatch<SetStateAction<string>>;
}) => {
    const classes = useStyles();
    const { handleChange, toggleEditMode, editMode } = useEditableText(title);
    console.log("editEdit", editMode);

    const debouncedSave = useRef(
        debounce((nextValue: string) => {
            saveToDb(nextValue);
        }, 500),
    ).current;

    const handleOnChange = (event: any) => {
        const { value: nextValue } = event.target;
        handleChange(event);
        debouncedSave(nextValue);
    };

    // useEffect(() => {
    //     console.log("editMode rendered", editMode);
    // }, [editMode])

    return (
        <InputBase
            autoFocus
            name={name}
            defaultValue={title}
            // error={text === ""}
            onChange={(e) => {
                handleOnChange(e);
            }}
            // disabled={!editMode}
            className={classes.textField}
            // onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => toggleEditMode()}
            onDoubleClick={() => toggleEditMode()}
            fullWidth={true}
        />
    );
};
