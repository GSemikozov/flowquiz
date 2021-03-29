import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleQuizListItem, getCurrentListItemSelector } from "./quizListSlice";
import { QuizItem } from "./QuizItem";
import { useParams } from "react-router-dom";

export const QuizItemList = () => {
    const dispatch = useDispatch();
    let { id } = useParams();

    const item = useSelector(getCurrentListItemSelector(id));

    return (
        <>
            <div>
                {item && (
                    <QuizItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        completed={item.completed}
                        questions={item.questions}
                        onClick={() => dispatch(toggleQuizListItem(item.id))}
                    />
                )}
            </div>
        </>
    );
};
