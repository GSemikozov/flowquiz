import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getListSelector } from "../features/quiz-list/quizListSlice";
import { Link } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const CreatePage = () => {
    const menu = useSelector(getListSelector);
    return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
            <Typography>Create</Typography>
            {menu.map((item) => (
                <Link key={item.id} to={`edit/${item.id}`}>
                    <Button variant="outlined">{item.title.text}</Button>
                </Link>
            ))}
        </div>
    );
};
