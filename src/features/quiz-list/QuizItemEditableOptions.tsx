import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import RadioGroup from "@material-ui/core/RadioGroup";
import {
    Grid,
    // IconButton,
    List,
    // ListItem,
    // ListItemIcon,
    // ListItemSecondaryAction,
    // ListItemText,
    TextField,
} from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
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
    list: {
        counterReset: "alphabeticList",
        listStyleType: "none",
    },
}));

export const QuizItemEditableOptions = ({ id }: { id: number }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const store = useStore();
    const listItemData = useSelector(getCurrentListItemOptionsSelector(store.getState(), id));
    const [value] = useState("Option");

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
    }, [dispatch, id]);

    // const handleChange = (event: any) => {
    //     event.preventDefault();
    //     setInputValue(event.target.value);
    // };

    // const setInputValue = (value: string) => {
    //     setValue(value);
    // };

    useEffect(() => {
        console.log("radio value changed", value);
    }, [value]);

    const DefaultItem = () => {
        return (
            <Grid
                container
                spacing={1}
                style={{ marginBottom: "20px", marginTop: "8px" }}
                alignItems="center"
            >
                <Grid item style={{ paddingLeft: "20px" }}>
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
        <List className={classes.list}>
            {listItemData &&
                listItemData.questions.length > 0 &&
                listItemData?.questions.map((item: questionsItem) => (
                    <QuizItemEditableOption
                        key={item.id}
                        quizListId={id}
                        questionId={item.id}
                        name={item.title}
                        initialTitle={item.title}
                    />
                ))}
            <DefaultItem />
        </List>
    );
};
