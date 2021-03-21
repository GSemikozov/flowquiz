import React, { useCallback, useState } from "react";
import { quizListItemType } from "./types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, IconButton, TextareaAutosize } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { QuizListItemEditableTitle } from "./QuizListItemEditableTitle";
import { QuizItemEditableOptions } from "./QuizItemEditableOptions";
import { FilestackPicker } from "../filestack/Filestack";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
    getCurrentListItemSelector,
    updateQuizListItemDescription,
    updateQuizListItemDescription2,
} from "./quizListSlice";

export type ClickType = {
    onClick: () => { payload: any; type: string };
};

const useStyles = makeStyles((theme) => ({
    cardContent: {
        padding: 0,
        "&:last-child": {
            padding: 0,
        },
    },
    cardHeader: {
        paddingBottom: 0,
    },
}));

export const QuizItem = ({
    onClick,
    id,
    title,
    completed,
    questions,
}: ClickType & quizListItemType) => {
    const classes = useStyles();
    const store = useStore();
    const item = useSelector(getCurrentListItemSelector(store.getState(), id));

    const [open, setOpen] = useState(false); // filepicker
    const [description, setDescription] = useState(item?.description || "");
    const [description2, setDescription2] = useState(item?.description2 || "");

    const dispatch = useDispatch();

    const handleDescriptionChange = useCallback(
        (e) => {
            setDescription(() => e.target.value);
            dispatch(
                updateQuizListItemDescription({
                    description: description,
                    quizListItemId: id,
                }),
            );
        },
        [dispatch, id, description, setDescription],
    );

    const handleDescription2Change = useCallback(
        (e) => {
            setDescription2(() => e.target.value);
            dispatch(
                updateQuizListItemDescription2({
                    description2: description2,
                    quizListItemId: id,
                }),
            );
        },
        [dispatch, id, description, setDescription],
    );

    return (
        <div style={{ marginBottom: "40px" }}>
            <div style={{ textAlign: "left" }}>
                <Card>
                    <CardHeader
                        action={
                            <IconButton onClick={() => setOpen((prev) => !prev)}>
                                <ImageIcon />
                            </IconButton>
                        }
                        title={<QuizListItemEditableTitle title={title} id={id} />}
                        className={classes.cardHeader}
                    />
                    <CardContent className={classes.cardContent}>
                        <FilestackPicker
                            open={open}
                            toggle={() => setOpen((prev) => !prev)}
                            listItemId={id}
                        />
                        <div style={{ padding: "0 10px" }}>
                            <TextareaAutosize
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                    border: "none",
                                    outline: "none",
                                    resize: "none",
                                }}
                                aria-label="minimum height"
                                rowsMin={1}
                                rowsMax={5}
                                placeholder="Your contents here"
                                value={description}
                                onChange={(e) => handleDescriptionChange(e)}
                            />
                        </div>
                        <div style={{ padding: "0 10px" }}>
                            <TextareaAutosize
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                    border: "none",
                                    outline: "none",
                                    resize: "none",
                                    fontStyle: "italic",
                                }}
                                aria-label="minimum height"
                                rowsMin={1}
                                rowsMax={5}
                                placeholder="Description here (optional)"
                                value={description2}
                                onChange={(e) => handleDescription2Change(e)}
                            />
                        </div>
                        <QuizItemEditableOptions id={id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
