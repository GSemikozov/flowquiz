import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Grid, TextField } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch, useSelector, useStore } from "react-redux";
import { addQuestionsListOption, getCurrentListItemOptionsSelector } from "./quizListSlice";
import { QuizItemEditableOption } from "./QuizItemEditableOption";
import { questionsItem } from "./types";

const useStyles = makeStyles((theme) => ({
    formControl: {
        cursor: "pointer",
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

export const QuizItemEditableOptions = ({ id }: { id: number }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const store = useStore();
    const listItemData = useSelector(getCurrentListItemOptionsSelector(store.getState(), id));
    const [value, setValue] = useState("Option");

    useEffect(() => {
        console.log("listItemData", id, listItemData);
        console.log("store.getState()", store.getState());
    }, [id, listItemData, store]);

    const addMoreItem = useCallback(() => {
        const newOptionData = {
            quizListItemId: id,
            quizListItemOption: { id: Date.now(), title: "Option", answer: "", isTrue: false },
        };

        dispatch(addQuestionsListOption(newOptionData));
    }, [dispatch]);

    const handleChange = (event: any) => {
        event.preventDefault();
        setInputValue(event.target.value);
    };

    const setInputValue = (value: string) => {
        setValue(value);
    };

    useEffect(() => {
        console.log("radio value changed", value);
    }, [value]);

    const DefaultItem = () => {
        return (
            <Grid container spacing={1} style={{ marginBottom: "20px" }} alignItems="center">
                <Grid item style={{ paddingLeft: "12px" }}>
                    <RadioButtonUncheckedIcon color="disabled" />
                </Grid>
                <Grid item>
                    <TextField
                        className={classes.formControl}
                        placeholder="Add more option"
                        onClick={addMoreItem}
                    />
                </Grid>
            </Grid>
        );
    };

    return (
        <RadioGroup
            aria-label={listItemData.title}
            name={`question-group-${id}`}
            value={value}
            onChange={handleChange}
        >
            <div style={{ width: "100%", padding: "0 12px", boxSizing: "border-box" }}>
                {listItemData.questions.length > 0 &&
                    listItemData.questions.map((item: questionsItem) => (
                        <QuizItemEditableOption
                            key={item.id}
                            quizListId={id}
                            questionId={item.id}
                            name={item.title}
                            initialTitle={item.title}
                        />
                    ))}
                <DefaultItem />
            </div>
        </RadioGroup>
    );
};
