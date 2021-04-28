import React, { useCallback, useEffect, useRef } from "react";
// import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import {
    // ClickAwayListener,
    InputBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateQuizListItemTitle, updateQuizChapterTitle } from "../quiz-list/quizListSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    textField: {
        minWidth: "calc(100% - 24px)",
        width: "auto",
        maxWidth: "100%",
        marginRight: "24px",
        color: "black",
        opacity: 1,
        border: "1px solid transparent",
        boxSizing: "border-box",
        "&:before": {
            borderBottom: "0 !important",
        },
        "&[disabled]": {
            pointerEvents: "none",
        },
        "&:focus": {
            outline: "2px solid blue",
        },
    },
    disabled: {
        color: "black !important",
        pointerEvents: "none",
    },
    edit: {
        background: "white",
        border: "1px solid rgba(0, 0, 0, 0.08)",
    },
}));

export const QuizNavEditableTitle = ({
    title,
    id,
    quizListItemId,
    isChapter,
    handleChange,
    handleRename,
    editMode,
    setEditMode,
    toggleEditMode,
}: {
    title: string;
    id: string;
    quizListItemId?: string;
    isChapter?: boolean;
    handleChange: (value: any) => void;
    handleRename: (value: boolean) => void;
    editMode: boolean;
    setEditMode: (value: (prev: any) => boolean) => void;
    toggleEditMode: () => void;
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    // const { handleChange, toggleEditMode, editMode, setEditMode } = useEditableText(title);

    const updateItemTitle = useCallback(
        (title: string) => {
            isChapter
                ? dispatch(updateQuizChapterTitle({ title: title, chapterId: id }))
                : dispatch(
                      updateQuizListItemTitle({ title: title, quizListItemId: quizListItemId }),
                  );
        },
        [dispatch, id, isChapter, quizListItemId],
    );

    const debouncedSave = useRef(
        debounce((nextValue: string) => {
            updateItemTitle(nextValue);
        }, 10),
    ).current;

    const handleOnChange = (event: any) => {
        const { value: nextValue } = event.target;
        handleChange(event);
        debouncedSave(nextValue);
    };

    // const handleClickOutside = useCallback(() => {
    //     setEditMode(false);
    // }, [setEditMode]);

    // const changeEditMode = useCallback(() => {
    //     handleRename(true);
    // }, []);

    useEffect(() => {
        // console.log("1. !!!", title)
        // setText(title);
        // debouncedSave(title);
        console.log("4. !! editMode changed, inside", editMode, inputRef.current);
        // if (editMode) {
        // @ts-ignore
        inputRef.current.focus();
        // @ts-ignore
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
        // }
    }, [editMode]);

    return (
        // <ClickAwayListener onClickAway={handleClickOutside}>
        <InputBase
            inputRef={inputRef}
            autoFocus={true}
            name={`${id}`}
            value={title}
            // error={text === ""}
            onChange={(e) => {
                handleOnChange(e);
            }}
            className={`${classes.textField} ${!editMode && classes.disabled} ${
                editMode && classes.edit
            }`}
            // onDoubleClick={() => setEditMode((prev) => !prev)}
            onBlur={() => {
                setEditMode((prev) => !prev);
            }}
            disabled={!editMode}
            fullWidth={true}
        />
        // </ClickAwayListener>
    );
};
