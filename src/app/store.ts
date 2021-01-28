import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import quizItemImageReducer from "../features/filestack/filestackSlice";
import quizListReducer from "../features/quiz-list/quizListSlice";

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        quizItemImage: quizItemImageReducer,
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
