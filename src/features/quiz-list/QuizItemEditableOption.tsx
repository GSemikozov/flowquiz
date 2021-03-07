import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    removeQuestionsListOption,
    updateQuestionsOptionAnswer,
    updateQuestionsListOptionTitle,
    toggleQuestionsListOptionChecked,
    getCurrentListItemOptionsSelector,
    getCurrentListItemOptionsStatusSelector,
} from "./quizListSlice";
import {
    Collapse,
    Grid,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextareaAutosize,
    Tooltip,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { CheckBox, Close, ExpandLess, ExpandMore } from "@material-ui/icons";
import { useDispatch, useSelector, useStore } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { QuizItemEditableInput } from "./QuizItemEditableInput";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

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
    listItem: {
        counterIncrement: "alphabeticList",
    },
    listItemIcon: {
        minWidth: 40,
        position: "relative",
        "&:before": {
            content: "counter(alphabeticList, upper-alpha)",
            speak: "counter(alphabeticList, upper-alpha)",
            position: "absolute",
            top: 2,
            left: 7,
        },
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
    const store = useStore();
    const isTrue = useSelector(
        getCurrentListItemOptionsStatusSelector(store.getState(), quizListId, questionId),
    );
    const currentItemOptions = useSelector(
        getCurrentListItemOptionsSelector(store.getState(), questionId),
    );

    const dispatch = useDispatch();
    const classes = useStyles();
    const [dbValue, saveToDb] = useState(""); // would be an API call normally
    const [answer, setAnswer] = useState("");
    const [title, setTitle] = useState(initialTitle);
    const [isOpened, setIsOpened] = useState(true);

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

    useEffect(() => {
        console.log("currentItemOptions", currentItemOptions);
        const atLeastOneTrue =
            currentItemOptions?.questions.some((option) => option.isTrue) || false;
        setIsOpened(atLeastOneTrue);
        console.log("atLeastOneTrue", atLeastOneTrue);
    }, [currentItemOptions]);

    return (
        <>
            <ListItem
                key={questionId}
                button
                onClick={() => console.log("clicked")}
                className={classes.listItem}
            >
                <ListItemIcon className={classes.listItemIcon}>
                    <CheckBoxOutlineBlankIcon />
                </ListItemIcon>
                <ListItemText>
                    <QuizItemEditableInput name={name} title={title} saveToDb={saveToDb} />
                </ListItemText>
                <ListItemSecondaryAction>
                    <Tooltip title="Set answers" aria-label="Set answers">
                        <IconButton onClick={() => setIsOpened((prev) => !prev)} title="set answer">
                            <QuestionAnswerIcon color={isOpened ? "primary" : "inherit"} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove" aria-label="Remove">
                        <IconButton edge="end" aria-label="delete" onClick={removeItem}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={isOpened} timeout="auto">
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
                                borderLeft: `${isTrue ? "2px solid green" : "2px solid gray"}`,
                                outline: "none",
                                resize: "none",
                            }}
                            aria-label="minimum height"
                            rowsMin={1}
                            placeholder={`Place your comment here`}
                            value={answer}
                            onChange={(e) => handleAnswerChange(e)}
                            onBlur={() =>
                                updateItemAnswer({ answer: "hello", questionId: questionId })
                            }
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </>
    );
};
