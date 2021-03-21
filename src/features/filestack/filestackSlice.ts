import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

type quizItemImageUrlType = string;

type quizItemImageUploadType = {
    quizItemImageUrl: quizItemImageUrlType;
    listItemId: number;
};

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

export const quizItemUploadImageAsync = ({
    quizItemImageUrl,
    listItemId,
}: quizItemImageUploadType): AppThunk => (dispatch) => {
    setTimeout(() => {
        dispatch(quizItemImageUpload(quizItemImageUrl));
        window.localStorage.setItem("file", quizItemImageUrl); // TODO: save to DB instead of localStorage
    }, 1000);
};

// export function selectCurrentUser(state: RootState) {
//     return state.currentUser;
// }
//
// export const selectCurrentAvatarUrl = (state: RootState) => selectCurrentUser(state).quizes;

// export const selectCurrentImageUrl = (state: RootState) =>
//     state.quizItemImage.quizItemImageUrl || window.localStorage.getItem("file"); // TODO: get from DB/store instead of localStorage

export default quizItemImage.reducer;
