import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { InputBase, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textField: {
        minWidth: 100,
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
    onPressEnter,
    onPressBackspace,
    isEditOnDoubleClick,
}: {
    name: string;
    title: string;
    saveToDb: Dispatch<SetStateAction<string>>;
    onPressEnter?: () => void;
    onPressBackspace?: () => void;
    isEditOnDoubleClick?: boolean;
}) => {
    const classes = useStyles();
    const { handleChange, toggleEditMode, editMode, setEditMode, text, setText } = useEditableText(
        title,
    );

    const debouncedSave = useRef(
        debounce((nextValue: string) => {
            saveToDb(nextValue);
        }, 10),
    ).current;

    const handleOnChange = (event: any) => {
        const { value: nextValue } = event.target;
        handleChange(event);
        debouncedSave(nextValue);
    };

    const handleClickOutside = useCallback(() => {
        setEditMode(false);
    }, [setEditMode]);

    // useEffect(() => {
    //     console.log("editMode rendered", editMode);
    // }, [editMode])

    useEffect(() => {
        setText(title);
        debouncedSave(title);
    }, [debouncedSave, setText, title]);

    return (
        <ClickAwayListener onClickAway={handleClickOutside}>
            {isEditOnDoubleClick ? (
                <InputBase
                    autoFocus
                    name={name}
                    value={title}
                    // error={text === ""}
                    onChange={(e) => {
                        handleOnChange(e);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onPressEnter && onPressEnter();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace" && text === "") {
                            onPressBackspace && onPressBackspace();
                        }
                    }}
                    className={classes.textField}
                    onDoubleClick={() => toggleEditMode()}
                    disabled={!editMode}
                    fullWidth={true}
                />
            ) : (
                <InputBase
                    autoFocus
                    name={name}
                    value={title}
                    // error={text === ""}
                    onChange={(e) => {
                        handleOnChange(e);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onPressEnter && onPressEnter();
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Backspace" && text === "") {
                            onPressBackspace && onPressBackspace();
                        }
                    }}
                    className={classes.textField}
                    onMouseEnter={() => toggleEditMode()}
                    onMouseLeave={() => toggleEditMode()}
                    fullWidth={true}
                />
            )}
        </ClickAwayListener>
    );
};
