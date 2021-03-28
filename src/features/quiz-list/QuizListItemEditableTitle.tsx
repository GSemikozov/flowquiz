import React, { useCallback, useRef } from "react";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateQuizListItemTitle } from "./quizListSlice";
import { useDispatch } from "react-redux";

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

export const QuizListItemEditableTitle = ({ title, id }: { title: string; id: string }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleChange, toggleEditMode } = useEditableText(title);

    const updateItemTitle = useCallback(
        (title: string) => {
            dispatch(updateQuizListItemTitle({ title: title, quizListItemId: id }));
        },
        [dispatch, id],
    );

    const debouncedSave = useRef(
        debounce((nextValue: string) => {
            updateItemTitle(nextValue);
        }, 500),
    ).current;

    const handleOnChange = (event: any) => {
        const { value: nextValue } = event.target;
        handleChange(event);
        debouncedSave(nextValue);
    };

    return (
        <div style={{ padding: "16px 20px 0" }}>
            <InputBase
                autoFocus
                name={`${id}`}
                defaultValue={title}
                // error={text === ""}
                onChange={(e) => {
                    handleOnChange(e);
                }}
                className={classes.textField}
                onMouseEnter={() => toggleEditMode()}
                onMouseLeave={() => toggleEditMode()}
                fullWidth={true}
            />
        </div>
    );
};
