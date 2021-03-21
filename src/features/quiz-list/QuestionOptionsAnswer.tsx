import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { questionsItem } from "./types";
import { Add, Check } from "@material-ui/icons";
import { Grid, IconButton, TextareaAutosize } from "@material-ui/core";
import { useDispatch, useStore } from "react-redux";
import { updateQuestionsListOption, updateQuestionsOptionAnswer } from "./quizListSlice";

const useStyles = makeStyles((theme) => ({
    formControl: {
        "& svg.hidden": {
            visibility: "hidden",
        },
        "& svg": {
            visibility: "visible",
        },
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

export const QuestionOptionsAnswer = ({
    id,
    name,
    questions,
}: {
    id: number;
    name: string;
    questions: questionsItem[];
}) => {
    const classes = useStyles();
    const [value, setValue] = useState(() => `${questions[0].title}${questions[0].id}`);

    const dispatch = useDispatch();

    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
    };

    const handleUpdate = useCallback(
        (question: questionsItem) => {
            console.log("UPDATE: ", id, JSON.stringify(question));
            dispatch(updateQuestionsListOption({ ...question, id }));
        },
        [dispatch, id],
    );

    const handleUpdateAnswer = useCallback(
        ({ answer, questionId }: { answer: string; questionId: number }) => {
            console.log("UPDATE ANSWER: ", id, questionId, answer);
            dispatch(updateQuestionsOptionAnswer({ answer, questionId, id }));
        },
        [dispatch, id],
    );

    const QuestionItem = ({ question }: { question: questionsItem }) => {
        return (
            <div style={{ padding: "0 20px" }}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item style={{ flexGrow: 1 }}>
                        <FormControlLabel
                            key={question.id}
                            value={`${question.title}${question.id}`}
                            control={<Radio />}
                            label={question.title}
                            onBlur={(e) => e.preventDefault()}
                        />
                    </Grid>
                    <Grid item>
                        <Check
                            className={value !== `${question.title}${question.id}` ? "hidden" : ""}
                            color="primary"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item style={{ flexGrow: 1 }}>
                        <TextareaAutosize
                            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
                            aria-label="minimum height"
                            rowsMin={2}
                            placeholder={`Place your comment for "${question.title}" option here`}
                            onBlur={() =>
                                handleUpdateAnswer({ answer: "hello", questionId: question.id })
                            }
                        />
                    </Grid>
                </Grid>
            </div>
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ textAlign: "left", width: "100%", margin: "0 0 20px" }}
        >
            <FormControl component="fieldset" className={classes.formControl} fullWidth={true}>
                <RadioGroup aria-label={name} name={name} value={value} onChange={handleChange}>
                    {questions &&
                        questions.map((question: questionsItem) => (
                            <QuestionItem key={question.id} question={question} />
                        ))}
                </RadioGroup>
            </FormControl>
        </form>
    );
};
