import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizList: [],
};

const quizSettingsSlice = createSlice({
    name: "quizList",
    initialState: initialState,
    reducers: {
        openAllAnswerFields(state, action) {},
    },
});

export const { openAllAnswerFields } = quizSettingsSlice.actions;

export default quizSettingsSlice.reducer;
