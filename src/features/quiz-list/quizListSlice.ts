import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { quizListType } from "./types";

const initialState = {
    quizList: [],
};

// let nextTodoId = 0;

const quizListSlice = createSlice({
    name: "quizList",
    initialState: initialState,
    reducers: {
        addNewQuizListItem(state) {
            // reducer(state, action) {
            //     const { id } = action.payload
            // @ts-ignore
            state.quizList.push({ id: Date.now(), completed: false });
            // },
            // @ts-ignore
            // prepare() {
            //     return { payload: { id: Date.now() } }
            // }
        },
        updateQuizListItem(state, action) {
            const { id, text, completed } = action.payload;
            // @ts-ignore
            state.quizList.push({ id, text, completed });
        },
        toggleQuizListItem(state, action) {
            // @ts-ignore
            const item = state.quizList.find((item) => item.id === action.payload);
            if (item) {
                // @ts-ignore
                item.completed = !item.completed;
            }
        },
        postQuizList(state, action) {
            state.quizList = action.payload;
        },
    },
});

export const {
    addNewQuizListItem,
    updateQuizListItem,
    toggleQuizListItem,
    postQuizList,
} = quizListSlice.actions;

export const quizListPostAsync = (quizList: quizListType): AppThunk => (dispatch) => {
    setTimeout(() => {
        dispatch(postQuizList(quizList));
        window.localStorage.setItem("file", JSON.stringify(quizList)); // TODO: save to DB instead of localStorage
    }, 1000);
};

export const getListSelector = (state: RootState) => {
    const data = JSON.parse(window.localStorage.getItem("quizList") || "{}");
    const res = state.quizList || data?.quizList;
    return res.quizList;
};

export default quizListSlice.reducer;
