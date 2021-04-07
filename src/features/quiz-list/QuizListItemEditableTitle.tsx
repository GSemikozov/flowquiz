import React, { useCallback, useEffect, useRef } from "react";
import { useEditableText } from "../../hooks/useEditableText";
import debounce from "lodash.debounce";
import { ClickAwayListener, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { updateQuizListItemTitle } from "./quizListSlice";
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
    },
}));

export const QuizListItemEditableTitle = ({
    title,
    id,
    isEditOnDoubleClick,
}: {
    title: string;
    id: string;
    isEditOnDoubleClick?: boolean;
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { handleChange, toggleEditMode, editMode, setEditMode } = useEditableText(title);

    const updateItemTitle = useCallback(
        (title: string) => {
            dispatch(updateQuizListItemTitle({ title: title, quizListItemId: id }));
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
        console.log("2. !!!", title);
        // setText(title);
        // debouncedSave(title);
    }, [title]);

    return (
        <div style={{ padding: "16px 20px 0" }}>
            <ClickAwayListener onClickAway={handleClickOutside}>
                {isEditOnDoubleClick ? (
                    <InputBase
                        autoFocus
                        name={`${id}`}
                        value={title}
                        onChange={(e) => {
                            handleOnChange(e);
                        }}
                        className={classes.textField}
                        onDoubleClick={() => toggleEditMode()}
                        disabled={!editMode}
                        fullWidth={true}
                    />
                ) : (
                    <InputBase
                        autoFocus
                        name={`${id}`}
                        value={title}
                        onChange={(e) => {
                            handleOnChange(e);
                        }}
                        className={classes.textField}
                        onMouseEnter={() => toggleEditMode()}
                        onMouseLeave={() => toggleEditMode()}
                        fullWidth={true}
                    />
                )}
            </ClickAwayListener>
        </div>
    );
};
