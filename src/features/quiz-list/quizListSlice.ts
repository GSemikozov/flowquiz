import { createSelector, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { quizListType } from "./types";

const initialState = {
    quizList: [
        {
            id: Date.now(),
            title: "Question 1",
            description: "",
            description2: "",
            imageUrl: "",
            isActive: false,
            completed: false,
            questions: [
                {
                    id: Date.now() + 1,
                    title: "Option",
                    answer: "",
                    isOpen: false,
                    isTrue: false,
                },
            ],
        },
        {
            id: Date.now() + 2,
            title: "Question 2",
            description: "",
            description2: "",
            imageUrl: "",
            isActive: false,
            completed: false,
            questions: [
                {
                    id: Date.now() + 3,
                    title: "Option",
                    answer: "",
                    isOpen: false,
                    isTrue: false,
                },
            ],
        },
    ],
};

const getRandomId = () => Math.round(Math.random() * 10);

const getDummyListItem = () => {
    return {
        id: getRandomId(),
        title: "Question",
        description: "",
        description2: "",
        imageUrl: "",
        isActive: false,
        completed: false,
        questions: [
            {
                id: getRandomId(),
                title: "Option",
                answer: "",
                isOpen: false,
                isTrue: false,
            },
        ],
    };
};

const getQuestion = ({
    state,
    quizListItemId,
    questionId,
}: {
    state: any;
    quizListItemId: number;
    questionId: number;
}) => {
    const item = state.quizList.find((item: any) => item.id === quizListItemId);
    return item.questions.find((question: any) => question.id === questionId);
};

const quizListSlice = createSlice({
    name: "quizList",
    initialState: initialState,
    reducers: {
        addNewQuizListItem(state) {
            // reducer(state, action) {
            //     const { id } = action.payload
            // },
            // @ts-ignore
            // prepare() {
            //     return { payload: { id: Date.now() } }
            // }
            // @ts-ignore
            state.quizList.push(getDummyListItem());
        },
        updateQuizListItem(state, action) {
            const { id, title, completed, questions } = action.payload;
            // @ts-ignore
            state.quizList.push({ id, title, completed, questions });
        },
        updateQuizListItemTitle(state, action) {
            const { title, quizListItemId } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            console.log("updateQuizListItemTitle", title, quizListItemId, item);
            if (item) {
                // @ts-ignore
                item.title = title;
            }
        },
        updateQuizListItemDescription(state, action) {
            const { description, quizListItemId } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            console.log("updateQuizListItem description", description, quizListItemId, item);
            if (item) {
                // @ts-ignore
                item.description = description;
            }
        },
        updateQuizListItemDescription2(state, action) {
            const { description2, quizListItemId } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            console.log("updateQuizListItem description", description2, quizListItemId, item);
            if (item) {
                // @ts-ignore
                item.description2 = description2;
            }
        },
        updateQuizListItemImg(state, action) {
            const { imageUrl, quizListItemId } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            console.log("updateQuizListItem img", imageUrl, quizListItemId, item);
            if (item) {
                // @ts-ignore
                item.imageUrl = imageUrl;
            }
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
        addQuestionsListOption(state, action) {
            const item = state.quizList.find((item) => item.id === action.payload.quizListItemId);
            console.log("addQuestionsListOption item", item, action.payload.quizListItemOption);
            if (item) {
                // @ts-ignore
                item.questions.push(action.payload.quizListItemOption);
            }
        },
        removeQuestionsListOption(state, action) {
            const item = state.quizList.find((item) => item.id === action.payload.quizListItemId);
            console.log("remove item", item, action.payload);
            if (item) {
                // @ts-ignore
                item.questions = item.questions.filter(
                    (question) => question.id !== action.payload.questionId,
                );
            }
        },
        toggleQuestionsListOption(state, action) {
            // @ts-ignore
            const item = state.quizList.find((item) => item.id === action.payload.quizListItemId);
            const question =
                item &&
                getQuestion({
                    ...state,
                    ...action.payload.quizListItemId,
                    ...action.payload.questionId,
                });

            if (question) {
                // @ts-ignore
                question.isTrue = !item.isTrue;
            }
        },
        updateQuestionsListOption(state, action) {
            const { quizListItemId, questionId, title, isTrue, answer } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            const question = item && getQuestion({ ...state, ...quizListItemId, ...questionId });
            console.log("data from reducer: ", quizListItemId, questionId, title, isTrue, answer);
            console.log("question from reducer: ", question);

            if (question) {
                // @ts-ignore
                question.push({ id, title, isTrue, answer });
                // return state.map(todo =>
                //     todo.id === action.id ?
                //         { ...todo, text: action.text } :
                //         todo
                // )
            }
        },
        updateQuestionsOptionAnswer(state, action) {
            const { quizListItemId, questionId, answer } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            const question = item && getQuestion({ state, quizListItemId, questionId });

            if (question) {
                // @ts-ignore
                question.answer = answer;
            }
        },
        updateQuestionsListOptionTitle(state, action) {
            const { quizListItemId, questionId, title } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);
            const question = item && getQuestion({ state, quizListItemId, questionId });

            if (question) {
                // @ts-ignore
                question.title = title;
            }
        },
        toggleQuestionsListOptionChecked(state, action) {
            const { quizListItemId, questionId } = action.payload;
            const item = state.quizList.find((item) => item.id === quizListItemId);

            item &&
                item.questions.map((question) => {
                    if (question.id === questionId) {
                        return (question.isTrue = !question.isTrue);
                    } else {
                        return (question.isTrue = false);
                    }
                });
        },
        openAllAnswerFields(state) {
            state.quizList.map((item) => {
                const modifiedItem = item.questions.map((question) => (question.isOpen = true));
                return {
                    ...item,
                    ...modifiedItem,
                };
            });
        },
        closeAllAnswerFields(state) {
            state.quizList.forEach((item) =>
                item.questions.forEach((question) => (question.isOpen = false)),
            );
        },
        setListItemActive(state, action) {
            const activeItem = state.quizList.find((item) => item.id === action.payload);

            if (activeItem) {
                activeItem.isActive = true;
            }
        },
    },
});

export const {
    addNewQuizListItem,
    updateQuizListItem,
    toggleQuizListItem,
    updateQuizListItemTitle,
    updateQuizListItemDescription,
    updateQuizListItemDescription2,
    updateQuizListItemImg,
    postQuizList,
    addQuestionsListOption,
    removeQuestionsListOption,
    toggleQuestionsListOption,
    updateQuestionsListOption,
    updateQuestionsOptionAnswer,
    updateQuestionsListOptionTitle,
    toggleQuestionsListOptionChecked,
    openAllAnswerFields,
    closeAllAnswerFields,
    setListItemActive,
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

export const getCurrentListItemSelector = (state: RootState, id: number) =>
    createSelector(getListSelector, (list) => list.find((item) => item.id === id));

export const getCurrentListItemOptionsSelector = (state: RootState, quizQuestionId: number) =>
    createSelector(getListSelector, (list) => list.find((item) => item.id === quizQuestionId));

export const getCurrentListItemOptionsStatusSelector = (
    state: RootState,
    quizListItemId: number,
    quizQuestionId: number,
) =>
    createSelector(getListSelector, (list) => {
        const item = list.find((item) => item.id === quizListItemId);
        const question = item?.questions.find((question) => question.id === quizQuestionId);
        return question && question.isTrue;
    });

export const getCurrentListItemOptionsOpenAnswerSelector = (
    state: RootState,
    quizListItemId: number,
    quizQuestionId: number,
) =>
    createSelector(getListSelector, (list) => {
        const item = list.find((item) => item.id === quizListItemId);
        const question = item?.questions.find((question) => question.id === quizQuestionId);
        return question ? question.isOpen : false;
    });

export const getCurrentListItemIdSelector = (state: RootState, quizQuestionId: number) =>
    createSelector(getListSelector, (list) => {
        console.log("ge id selector", quizQuestionId);
        // list.filter(item => item.id === quizQuestionId)[0].id
    });

export default quizListSlice.reducer;
