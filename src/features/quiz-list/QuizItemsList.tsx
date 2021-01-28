import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { addNewQuizListItem, toggleQuizListItem, getListSelector } from "./quizListSlice";
import { QuizItem } from "./QuizItem";
import { quizListItemType } from "./types";

export const QuizItemList = () => {
    const dispatch = useDispatch();
    const listData = useSelector(getListSelector);

    const displayBlock = useCallback(() => {
        dispatch(addNewQuizListItem());
    }, [dispatch]);

    return (
        <>
            <div>
                {listData &&
                    listData.map((todo: quizListItemType) => (
                        <QuizItem
                            key={todo.id}
                            completed={todo.completed}
                            onClick={() => dispatch(toggleQuizListItem(todo.id))}
                            {...todo}
                        />
                    ))}
            </div>
            <Fab color="primary" aria-label="add" onClick={displayBlock}>
                <AddIcon />
            </Fab>
        </>
    );
};
