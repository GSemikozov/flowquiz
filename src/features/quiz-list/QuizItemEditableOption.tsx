import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    removeQuestionsListOption,
    updateQuestionsOptionAnswer,
    updateQuestionsListOptionTitle,
    toggleQuestionsListOptionChecked,
} from "./quizListSlice";
import { Grid, IconButton, TextareaAutosize } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { Close } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { QuizItemEditableInput } from "./QuizItemEditableInput";

const useStyles = makeStyles((theme) => ({
    label: {
        margin: 0,
    },
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
    disabled: {
        color: "black",
        borderBottom: 0,
        "&:before": {
            borderBottom: 0,
        },
    },
    btnIcons: {
        marginLeft: 10,
    },
}));

export const QuizItemEditableOption = ({
    initialTitle,
    name,
    quizListId,
    questionId,
}: {
    initialTitle: string;
    name: string;
    quizListId: number;
    questionId: number;
}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [dbValue, saveToDb] = useState(""); // would be an API call normally
    const [answer, setAnswer] = useState("");
    const [title, setTitle] = useState(initialTitle);

    const handleAnswerChange = (e: any) => {
        setAnswer(e.target.value);
    };

    const updateItemChecked = useCallback(
        (questionId) => {
            dispatch(
                toggleQuestionsListOptionChecked({
                    questionId: questionId,
                    quizListItemId: quizListId,
                }),
            );
        },
        [dispatch, quizListId],
    );

    const updateItemTitle = useCallback(
        ({ title }: { title: string }) => {
            console.log("updateQuizListItemTitle: ", quizListId, title);
            // dispatch(updateQuizListItemTitle({title: title, id: quizListId}));
            dispatch(
                updateQuestionsListOptionTitle({
                    title: title,
                    questionId: questionId,
                    quizListItemId: quizListId,
                }),
            );
        },
        [dispatch, quizListId, questionId],
    );

    const updateItemAnswer = useCallback(
        ({ questionId }: { answer: string; questionId: number }) => {
            console.log("UPDATE ANSWER: ", quizListId, questionId, answer);
            dispatch(
                updateQuestionsOptionAnswer({
                    answer: answer,
                    questionId: questionId,
                    quizListItemId: quizListId,
                }),
            );
        },
        [dispatch, quizListId, answer],
    );

    const removeItem = useCallback(() => {
        dispatch(
            removeQuestionsListOption({
                quizListItemId: quizListId,
                questionId: questionId,
            }),
        );
    }, [dispatch, quizListId, questionId]);

    const initialRender = useRef(true);

    useEffect(() => {
        console.log("will store dbValue", dbValue);
        setTitle(dbValue);
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            updateItemTitle({ title: dbValue });
        }
    }, [dispatch, dbValue, updateItemTitle]);

    return (
        <>
            <Grid container alignItems="center">
                <Grid item>
                    <FormControlLabel
                        key={questionId}
                        value={`${questionId}`}
                        control={<Radio />}
                        label=""
                        onBlur={(e) => e.preventDefault()}
                        onChange={() => updateItemChecked(questionId)}
                        className={classes.label}
                    />
                </Grid>
                <Grid item style={{ flexGrow: 1 }}>
                    <QuizItemEditableInput name={name} title={title} saveToDb={saveToDb} />
                </Grid>
                <Grid item>
                    <IconButton onClick={removeItem}>
                        <Close />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid
                    item
                    style={{ flexGrow: 1, margin: "0 16px 0 32px", boxSizing: "border-box" }}
                >
                    <TextareaAutosize
                        style={{
                            width: "100%",
                            padding: "10px",
                            boxSizing: "border-box",
                            border: "none",
                            borderLeft: "2px solid gray",
                            outline: "none",
                            resize: "none",
                        }}
                        aria-label="minimum height"
                        rowsMin={1}
                        placeholder={`Place your comment here`}
                        value={answer}
                        onChange={(e) => handleAnswerChange(e)}
                        onBlur={() => updateItemAnswer({ answer: "hello", questionId: questionId })}
                    />
                </Grid>
            </Grid>
        </>
    );
};
