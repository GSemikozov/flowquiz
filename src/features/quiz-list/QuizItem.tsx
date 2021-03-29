import React, { useCallback, useEffect, useState } from "react";
import { quizListItemType } from "./types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, IconButton, TextareaAutosize } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { QuizListItemEditableTitle } from "./QuizListItemEditableTitle";
import { QuizItemEditableOptions } from "./QuizItemEditableOptions";
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
    const item = useSelector(getCurrentListItemSelector(id));

    const [description, setDescription] = useState(item?.description || "");
    const [description2, setDescription2] = useState(item?.description2 || "");

    const isTitleVisible = title.isVisible;
    const isImg = !!item?.imageUrl;

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

    useEffect(() => {
        console.log("isTitleVisible updated", isTitleVisible);
    }, [isTitleVisible]);

    return (
        <div style={{ marginBottom: "40px" }}>
            <div style={{ textAlign: "left" }}>
                <Card>
                    <CardContent className={classes.cardContent}>
                        {isImg && (
                            <img
                                src={item?.imageUrl}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "300px",
                                    display: "block",
                                    margin: "16px auto",
                                    borderRadius: "5px",
                                    overflow: "hidden",
                                }}
                                alt="img"
                            />
                        )}
                        {isTitleVisible && <QuizListItemEditableTitle title={title.text} id={id} />}
                        <div style={{ padding: "0 10px" }}>
                            <TextareaAutosize
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                    fontSize: "16px",
                                    color: "initial",
                                    border: "none",
                                    outline: "none",
                                    resize: "none",
                                }}
                                aria-label="minimum height"
                                rowsMin={1}
                                rowsMax={5}
                                placeholder="Your answer"
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
                                    fontSize: "16px",
                                    border: "none",
                                    outline: "none",
                                    resize: "none",
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
