import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    toggleQuizListItem,
    // getCurrentListItemSelector,
    // getListItemByIdSelector,
    // getCurrentChapterSelector,
    isChapterSelector,
    getItemSelector,
} from "./quizListSlice";
import { QuizItem } from "./QuizItem";
import { useParams } from "react-router-dom";

export type QuestionTitleType = {
    text: string;
    isVisible: boolean;
};

export type QuestionsType = {
    id: string;
    title: string;
    answer: string;
    isOpen: boolean;
    isTrue: boolean;
};

export type ChapterQuestionType = {
    id: string;
    title: QuestionTitleType;
    description: string;
    description2: string;
    imageUrl: string;
    isActive: boolean;
    completed: boolean;
    questions: QuestionsType[];
};

export type ChapterType = {
    id: string;
    title: string;
    chapterQuestions: ChapterQuestionType[];
};

export const QuizItemList = () => {
    const dispatch = useDispatch();
    let { id } = useParams();

    const [chapterItem, setChapterItem] = useState({} as ChapterType);
    const [item, setItem] = useState({} as ChapterQuestionType);

    const chapter = useSelector(isChapterSelector(id));
    const question = useSelector(getItemSelector(id));

    useEffect(() => {
        console.log("QUESTION, ID OR CHAPTER CHANGED-----", id, question, chapter);
        question && setItem((prev) => question || prev);
        chapterItem && setChapterItem((prev) => chapterItem || prev);
    }, [id, question, chapter, chapterItem]);

    return (
        <>
            {!!chapter ? (
                <>Chapter page - {chapter.title}</>
            ) : (
                <>
                    Item page
                    {item && Object.keys(item).length > 0 && (
                        <QuizItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            completed={item.completed}
                            questions={item.questions}
                            onClick={() => dispatch(toggleQuizListItem(item.id))}
                        />
                    )}
                </>
            )}
        </>
    );
};
