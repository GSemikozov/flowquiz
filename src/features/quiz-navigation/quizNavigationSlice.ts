import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    activeTabId: 1,
};

const quizNavigationSlice = createSlice({
    name: "quizNavigation",
    initialState: initialState,
    reducers: {
        setActiveTab(state, action) {
            state.activeTabId = action.payload;
        },
    },
});

export const { setActiveTab } = quizNavigationSlice.actions;

export const selectActiveTab = (state: RootState) => state.quizNavigation.activeTabId;

export default quizNavigationSlice.reducer;
