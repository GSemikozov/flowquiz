import React, { useCallback, useEffect, useRef } from "react";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { ClickAwayListener, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
    updateQuestionsListOptionTitle,
    updateQuizListItemTitle,
} from "../quiz-list/quizListSlice";
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
        color: "grey",
    },
}));

export const QuizNavEditableTitle = ({
    title,
    id,
    questionId,
    isChapter,
}: {
    title: string;
    id: string;
    questionId?: string;
    isChapter?: boolean;
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleChange, toggleEditMode, editMode, setEditMode } = useEditableText(title);

    const updateItemTitle = useCallback(
        (title: string) => {
            isChapter
                ? dispatch(updateQuizListItemTitle({ title: title, quizListItemId: id }))
                : dispatch(
                      updateQuestionsListOptionTitle({
                          title: title,
                          questionId: questionId,
                          quizListItemId: id,
                      }),
                  );
        },
        [dispatch, id],
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
