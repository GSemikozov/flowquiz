import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import RadioGroup from "@material-ui/core/RadioGroup";
import {
    Button,
    // IconButton,
    List,
    // ListItem,
    // ListItemIcon,
    // ListItemSecondaryAction,
    // ListItemText,
    Typography,
} from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PlusIcon from "@material-ui/icons/Add";

// import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch, useSelector } from "react-redux";
import {
    addQuestionsListOption,
    closeTotallyAllAnswerFields,
    getCurrentListItemOptionsSelector,
} from "./quizListSlice";
import { QuizItemEditableOption } from "./QuizItemEditableOption";
import { questionsItem } from "./types";
import { getUuid } from "../../helpers";

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

export const QuizItemEditableOptions = ({ id }: { id: string }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const listItemData = useSelector(getCurrentListItemOptionsSelector(id));

    const addMoreItem = useCallback(() => {
        const isOpened = listItemData?.questions.find((question) => question.isOpen);
        console.log("addMoreItem: at least one opened", isOpened);

        const newOptionData = {
            quizListItemId: id,
            quizListItemOption: {
                id: getUuid(),
                title: "Option",
                answer: "",
                isTrue: false,
                isOpen: isOpened,
            },
        };

        dispatch(addQuestionsListOption(newOptionData));
    }, [dispatch, id, listItemData]);

    // const handleChange = (event: any) => {
    //     event.preventDefault();
    //     setInputValue(event.target.value);
    // };

    // const setInputValue = (value: string) => {
    //     setValue(value);
    // };

    useEffect(() => {
        console.log("ID CHANGED in Options list");
        dispatch(closeTotallyAllAnswerFields());
    }, [id, dispatch]);

    useEffect(() => {
        console.log("listItemData ---------", listItemData);
    }, [listItemData]);

    return (
        <>
            <Typography style={{ margin: "10px 20px 0", color: "#697386" }}>
                Select correct answer below
            </Typography>
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addMoreItem}
                    startIcon={<PlusIcon />}
                    style={{ margin: "40px 0 20px 24px" }}
                >
                    Add more
                </Button>
            </List>
        </>
    );
};
