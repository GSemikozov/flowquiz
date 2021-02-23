import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { addNewQuizListItem, toggleQuizListItem, getListSelector } from "./quizListSlice";
import { ClickType, QuizItem } from "./QuizItem";
import { quizListItemType } from "./types";

export const QuizItemList = () => {
    const dispatch = useDispatch();
    const listData = useSelector(getListSelector);

    const addMoreItem = useCallback(() => {
        dispatch(addNewQuizListItem);
    }, [dispatch]);

    return (
        <>
            <div>
                {listData &&
                    listData.map((item: quizListItemType) => (
                        <QuizItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            completed={item.completed}
                            questions={item.questions}
                            onClick={() => dispatch(toggleQuizListItem(item.id))}
                        />
                    ))}
            </div>
            <Fab color="primary" aria-label="add" onClick={addMoreItem}>
                <AddIcon />
            </Fab>
        </>
    );
};
