import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleQuizListItem, getListSelector, addNewQuizListItem } from "./quizListSlice";
import { QuizItem } from "./QuizItem";
import { quizListItemType } from "./types";
import { Box, Fab, Typography } from "@material-ui/core";
import { selectActiveTab } from "../quiz-navigation/quizNavigationSlice";

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export const QuizItemList = () => {
    const dispatch = useDispatch();
    const listData = useSelector(getListSelector);
    const activeTab = useSelector(selectActiveTab);

    const addMoreItem = useCallback(() => {
        dispatch(addNewQuizListItem());
    }, [dispatch]);

    return (
        <>
            <div>
                {listData &&
                    listData.map((item: quizListItemType, idx) => (
                        <TabPanel key={item.id} value={activeTab} index={idx}>
                            <QuizItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                completed={item.completed}
                                questions={item.questions}
                                onClick={() => dispatch(toggleQuizListItem(item.id))}
                            />
                        </TabPanel>
                    ))}
            </div>
            <Fab color="primary" aria-label="add" onClick={addMoreItem}>
                +
            </Fab>
        </>
    );
};
