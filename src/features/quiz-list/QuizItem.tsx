import React from "react";
import { quizListItemType } from "./types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import { QuizListItemEditableTitle } from "./QuizListItemEditableTitle";
import { QuizItemEditableOptions } from "./QuizItemEditableOptions";

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
}));

export const QuizItem = ({
    onClick,
    id,
    title,
    completed,
    questions,
}: ClickType & quizListItemType) => {
    const classes = useStyles();

    return (
        <div style={{ marginBottom: "40px" }}>
            <div style={{ textAlign: "left" }}>
                <Card>
                    <CardHeader
                        action={
                            <IconButton>
                                <ImageIcon />
                            </IconButton>
                        }
                        title={<QuizListItemEditableTitle title={title} id={id} />}
                    />
                    <CardContent className={classes.cardContent}>
                        <QuizItemEditableOptions id={id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
