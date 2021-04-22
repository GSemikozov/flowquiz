import React, { useCallback, useEffect, useRef } from "react";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { ClickAwayListener, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateQuizListItemTitle, updateQuizChapterTitle } from "../quiz-list/quizListSlice";
import { useDispatch } from "react-redux";

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
        "&[disabled]": {
            pointerEvents: "none",
        },
    },
    disabled: {
        color: "black !important",
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
    setEditMode: (value: boolean) => void;
    toggleEditMode: () => void;
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
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

    const handleClickOutside = useCallback(() => {
        setEditMode(false);
    }, [setEditMode]);

    const changeEditMode = useCallback(() => {
        handleRename(true);
    }, []);

    useEffect(() => {
        // console.log("1. !!!", title)
        // setText(title);
        // debouncedSave(title);
    }, [title]);

    return (
        <ClickAwayListener onClickAway={handleClickOutside}>
            <InputBase
                autoFocus
                name={`${id}`}
                value={title}
                // error={text === ""}
                onChange={(e) => {
                    handleOnChange(e);
                }}
                className={`${classes.textField} ${!editMode && classes.disabled}`}
                onDoubleClick={() => toggleEditMode()}
                disabled={!editMode}
                fullWidth={true}
            />
        </ClickAwayListener>
    );
};
