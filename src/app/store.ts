import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import quizListReducer from "../features/quiz-list/quizListSlice";
import quizSettingsReducer from "../features/quiz-settings/quizSettingsSlice";
import quizNavigationReducer from "../features/quiz-navigation/quizNavigationSlice";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

export const store = configureStore({
    reducer: {
        quizNavigation: quizNavigationReducer,
        quizSettings: quizSettingsReducer,
        quizList: quizListReducer,
    },
    middleware,
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
