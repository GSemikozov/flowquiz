import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    navigationMenu: [],
};

const quizNavigationSlice = createSlice({
    name: "quizNavigation",
    initialState: initialState,
    reducers: {
        setActiveTab(state, action) {
            // state.chapterId = action.payload;
        },
    },
});

export const { setActiveTab } = quizNavigationSlice.actions;

// export const selectActiveTab = (state: RootState) => state.quizNavigation.chapterId;

export default quizNavigationSlice.reducer;
