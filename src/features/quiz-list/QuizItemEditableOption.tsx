import React, { Props, useCallback, useEffect, useRef, useState } from "react";
import {
    removeQuestionsListOption,
    updateQuestionsOptionAnswer,
    updateQuestionsListOptionTitle,
    // toggleQuestionsListOptionChecked,
    getCurrentListItemOptionsSelector,
    getCurrentListItemOptionsStatusSelector,
    getCurrentListItemOptionsOpenAnswerSelector,
    addQuestionsListOption,
    openAllAnswerFields,
    closeAllAnswerFields,
    closeTotallyAllAnswerFields,
    toggleQuestionsListOptionChecked,
    getCurrentListItemOptionsAnswerStatusSelector,
    getCurrentListItemSelector,
} from "./quizListSlice";
import {
    Checkbox,
    Collapse,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Switch,
    TextareaAutosize,
    Tooltip,
} from "@material-ui/core";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Radio from "@material-ui/core/Radio";
// import { CheckBox, Close, ExpandLess, ExpandMore } from "@material-ui/icons";
import { useDispatch, useSelector, useStore } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { QuizItemEditableInput } from "./QuizItemEditableInput";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import EditIcon from "@material-ui/icons/Edit";
import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { QuestionAnswer } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import { green, grey, purple } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";
import { getUuid } from "../../helpers";

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
        border: "1px solid #E3E7EB",
        borderRadius: "8px",
        margin: "0 24px 8px",
        width: "auto",
    },
    listItemIcon: {
        minWidth: 40,
        position: "relative",
        "&:before": {
            content: "counter(alphabeticList, upper-alpha)",
            speak: "counter(alphabeticList, upper-alpha)",
            position: "absolute",
            top: 0,
            left: 0,
            fontSize: "0.8rem",
            width: "24px",
            height: "24px",
            lineHeight: "24px",
            verticalAlign: "middle",
            textAlign: "center",
            color: "blue",
            fontWeight: 600,
        },
    },
}));

const useSwitchStyles = makeStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        "&$checked": {
            transform: "translateX(16px)",
            color: theme.palette.common.white,
            "& + $track": {
                backgroundColor: "#52d869",
                opacity: 1,
                border: "none",
            },
        },
        "&$focusVisible $thumb": {
            color: "#52d869",
            border: "6px solid #fff",
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
}));

/* move for future */
const IOSSwitch = ({ ...props }) => {
    const classes = useSwitchStyles();

    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
};

export const ToggleCorrectAnswer = ({
    quizListItemId,
    questionId,
}: {
    quizListItemId: string;
    questionId: string;
}) => {
    const dispatch = useDispatch();

    const isTrue = useSelector(
        getCurrentListItemOptionsAnswerStatusSelector(quizListItemId, questionId),
    );

    const [checked, setChecked] = React.useState(isTrue);

    const handleToggle = useCallback(() => {
        console.log("------------- go and dispatch");
        setChecked((prev) => !prev);
        dispatch(toggleQuestionsListOptionChecked({ quizListItemId, questionId }));
    }, [dispatch, quizListItemId, questionId]);

    // useEffect(() => {
    //     console.log("------------- go and dispatch");
    // }, [checked, dispatch]);

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        icon={<Cancel color={isTrue ? "error" : "action"} />}
                        checkedIcon={<CheckCircle color="primary" />}
                        onChange={handleToggle}
                        checked={isTrue}
                    />
                }
                label=""
                style={{ marginRight: "0" }}
            />
        </FormGroup>
    );
};

export const QuizItemEditableOption = ({
    initialTitle,
    name,
    quizListId,
    questionId,
}: {
    initialTitle: string;
    name: string;
    quizListId: string;
    questionId: string;
}) => {
    const isAnswerOpen = useSelector(
        getCurrentListItemOptionsOpenAnswerSelector(quizListId, questionId),
    );
    const currentItemOptions = useSelector(getCurrentListItemOptionsSelector(quizListId));

    const dispatch = useDispatch();
    const classes = useStyles();
    const [dbValue, saveToDb] = useState(""); // would be an API call normally
    const [answer, setAnswer] = useState("");
    const [title, setTitle] = useState(initialTitle);
    const [isOpened, setIsOpened] = useState(false);

    const handleAnswerChange = useCallback(
        (e: any) => {
            setAnswer((prev) => e.target.value);
            dispatch(
                updateQuestionsOptionAnswer({
                    answer: e.target.value,
                    questionId: questionId,
                    quizListItemId: quizListId,
                }),
            );
        },
        [quizListId, questionId, setAnswer, dispatch],
    );

    const updateItemTitle = useCallback(
        ({ title }: { title: string }) => {
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

    const removeItem = useCallback(() => {
        if (currentItemOptions && currentItemOptions.questions.length > 1) {
            dispatch(
                removeQuestionsListOption({
                    quizListItemId: quizListId,
                    questionId: questionId,
                }),
            );
        }
    }, [dispatch, quizListId, questionId]);

    const addMoreItem = useCallback(() => {
        const isOpened = currentItemOptions?.questions.find((question) => question.isOpen);
        console.log("at least one opened", isOpened);
        const newOptionData = {
            quizListItemId: quizListId,
            quizListItemOption: {
                id: getUuid(),
                title: "",
                answer: "",
                isTrue: false,
                isOpen: isOpened,
            },
        };

        dispatch(addQuestionsListOption(newOptionData));
    }, [dispatch, quizListId]);

    const initialRender = useRef(true);

    useEffect(() => {
        setTitle(dbValue);
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            updateItemTitle({ title: dbValue });
        }
    }, [dispatch, dbValue, updateItemTitle]);

    useEffect(() => {
        const atLeastOneTrue =
            currentItemOptions?.questions.some((option) => option.isTrue) || false;
        console.log("atLeastOneTrue", atLeastOneTrue);
    }, [currentItemOptions]);

    // useEffect(() => {
    //     console.log("quizListId in Option ----------", quizListId);
    //     // setIsOpened(false);
    //     dispatch(closeTotallyAllAnswerFields());
    // }, [quizListId, dispatch]);

    useEffect(() => {
        console.log("-------- isAnswerOpen --------- ", isAnswerOpen);
    }, [isAnswerOpen]);

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
                    <QuizItemEditableInput
                        name={name}
                        title={title}
                        saveToDb={saveToDb}
                        onPressEnter={addMoreItem}
                        onPressBackspace={removeItem}
                    />
                </ListItemText>
                <ListItemSecondaryAction style={{ right: "44px" }}>
                    <Tooltip title="Remove" aria-label="Remove">
                        <IconButton edge="end" aria-label="delete" onClick={removeItem}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={isAnswerOpen} timeout="auto">
                <Grid container spacing={1} style={{ margin: "0 20px", alignItems: "center" }}>
                    <Grid item style={{ padding: "8px 16px", boxSizing: "border-box" }}>
                        {/*{!isTrue ? <Cancel color="error" /> : <CheckCircle color="secondary" />}*/}
                        <ToggleCorrectAnswer quizListItemId={quizListId} questionId={questionId} />
                    </Grid>
                    <Grid
                        item
                        style={{
                            flexGrow: 1,
                            padding: "10px 10px 10px 0",
                            boxSizing: "border-box",
                        }}
                    >
                        <TextareaAutosize
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                border: "none",
                                outline: "none",
                                resize: "none",
                                fontSize: "16px",
                            }}
                            aria-label="minimum height"
                            rowsMin={1}
                            placeholder={`Answer feedback goes here`}
                            value={answer}
                            onChange={(e) => handleAnswerChange(e)}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </>
    );
};
