import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getListSelector } from "../features/quiz-list/quizListSlice";
import { Link, useRouteMatch } from "react-router-dom";
// import ButtonGroup from "@material-ui/core/ButtonGroup";

export const CreatePage = () => {
    let { url } = useRouteMatch();
    const menu = useSelector(getListSelector);
    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <Typography>Create</Typography>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {menu.map((item) => {
                    return item.chapterQuestions.map((chapterQuestion) => (
                        <Link
                            key={chapterQuestion.id}
                            to={`${url}/edit/${chapterQuestion.id}`}
                            style={{ margin: "10px", height: "100px", display: "flex" }}
                        >
                            <Button variant="outlined" style={{ width: "100%" }}>
                                Chapter: {item.title} - Question: {chapterQuestion.title.text}
                            </Button>
                        </Link>
                    ));
                })}
            </div>
        </div>
    );
};
