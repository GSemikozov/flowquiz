import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

type quizItemImageUrlType = string;

const initialState = {
    quizItemImageUrl: "",
};

const quizItemImage = createSlice({
    name: "quizItemImage",
    initialState,
    reducers: {
        quizItemImageUpload: (state, action: PayloadAction<quizItemImageUrlType>) => {
            state.quizItemImageUrl = action.payload;
        },
    },
});

export const { quizItemImageUpload } = quizItemImage.actions;

export const quizItemUploadImageAsync = (quizItemImageUrl: quizItemImageUrlType): AppThunk => (
    dispatch,
) => {
    setTimeout(() => {
        dispatch(quizItemImageUpload(quizItemImageUrl));
    }, 1000);
};

// export function selectCurrentUser(state: RootState) {
//     return state.currentUser;
// }
//
// export const selectCurrentAvatarUrl = (state: RootState) => selectCurrentUser(state).quizes;

export const selectCurrentImageUrl = (state: RootState) => state.quizItemImage.quizItemImageUrl;

export default quizItemImage.reducer;
