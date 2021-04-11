import { createSelector, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { quizListType } from "./types";
import { getUuid } from "../../helpers";

const initialState = {
    quizList: [
        {
            id: "0987654321",
            title: "Chapter 1",
            chapterQuestions: [
                {
                    id: "5d23aae4-f7f9-4683-9db5-868435452779",
                    title: {
                        text: "Title 1",
                        isVisible: true,
                    },
                    description: "",
                    description2: "",
                    imageUrl: "",
                    isActive: false,
                    completed: false,
                    questions: [
                        {
                            id: "5cba",
                            title: "Option",
                            answer: "",
                            isOpen: false,
                            isTrue: false,
                        },
                    ],
                },
                {
                    id: "5d23aae4-f7f9-4683-9db5-868435452780",
                    title: {
                        text: "Title 2",
                        isVisible: true,
                    },
                    description: "",
                    description2: "",
                    imageUrl: "",
                    isActive: false,
                    completed: false,
                    questions: [
                        {
                            id: "5abc",
                            title: "Option",
                            answer: "",
                            isOpen: false,
                            isTrue: false,
                            options: [
                                {
                                    title: "",
                                },
                            ],
                        },
                        {
                            id: "5abcd",
                            title: "Option 2",
                            answer: "",
                            isOpen: false,
                            isTrue: false,
                        },
                    ],
                },
            ],
        },
    ],
};

const getDummyListItem = () => {
    const chapterId = getUuid();
    const questionId = getUuid();
    return {
        id: chapterId,
        title: "Chapter",
        chapterQuestions: [
            {
                id: getUuid(),
                title: {
                    text: "Title",
                    isVisible: true,
                },
                description: "",
                description2: "",
                imageUrl: "",
                isActive: false,
                completed: false,
                questions: [
                    {
                        id: questionId,
                        title: "Option",
                        answer: "",
                        isOpen: false,
                        isTrue: false,
                    },
                ],
            },
        ],
    };
};

const getQuestion = ({
    state,
    quizChapterId,
    quizListItemId,
    questionId,
}: {
    state: any;
    quizChapterId: string;
    quizListItemId: string;
    questionId: string;
}) => {
    const chapter = state.quizList.find((item: any) => item.id === quizChapterId);
    const item = chapter.chapterQuestions.find((item: any) => item.id === quizListItemId);
    return item.questions.find((question: any) => question.id === questionId);
};

const quizChapterId = "0987654321";

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
            // const { id, title, completed, questions } = action.payload;
            console.log("WILL PUSH UPDATED LIST", action.payload);
            // @ts-ignore
            state.quizList = action.payload;
        },
        updateQuizChapterTitle(state, action) {
            const { title, chapterId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === chapterId);

            if (chapter) {
                // @ts-ignore
                chapter.title = title;
            }
        },
        updateQuizListItemTitle(state, action) {
            const { title, quizListItemId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

            if (item) {
                // @ts-ignore
                item.title.text = title;
            }
        },
        toggleTitle(state, action) {
            const quizListItemId = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

            if (item) {
                // @ts-ignore
                item.title.isVisible = !item.title.isVisible;
            }
        },
        updateQuizListItemDescription(state, action) {
            const { description, quizListItemId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

            if (item) {
                // @ts-ignore
                item.description = description;
            }
        },
        updateQuizListItemDescription2(state, action) {
            const { description2, quizListItemId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

            if (item) {
                // @ts-ignore
                item.description2 = description2;
            }
        },
        updateQuizListItemImg(state, action) {
            const { imageUrl, quizListItemId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
            console.log("updateQuizListItem img", imageUrl, quizListItemId, item);
            if (item) {
                // @ts-ignore
                item.imageUrl = imageUrl;
            }
        },
        removeQuizListItemImg(state, action) {
            const { quizListItemId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
            console.log("REMOVE img", quizListItemId, item);
            if (item) {
                // @ts-ignore
                item.imageUrl = "";
            }
        },
        toggleQuizListItem(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === action.payload);
            if (item) {
                // @ts-ignore
                item.completed = !item.completed;
            }
        },
        postQuizList(state, action) {
            state.quizList = action.payload;
        },
        addQuestionsListOption(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find(
                (item) => item.id === action.payload.quizListItemId,
            );

            if (item) {
                // @ts-ignore
                item.questions.push(action.payload.quizListItemOption);
            }
        },
        removeQuestionsListOption(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find(
                (item) => item.id === action.payload.quizListItemId,
            );

            if (item) {
                // @ts-ignore
                item.questions = item.questions.filter(
                    (question) => question.id !== action.payload.questionId,
                );
            }
        },
        toggleQuestionsListOption(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find(
                (item) => item.id === action.payload.quizListItemId,
            );
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
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
            const question = item && getQuestion({ ...state, ...quizListItemId, ...questionId });

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
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
            const question =
                item && getQuestion({ state, quizChapterId, quizListItemId, questionId });

            if (question) {
                // @ts-ignore
                question.answer = answer;
            }
        },
        updateQuestionsListOptionTitle(state, action) {
            const { quizListItemId, questionId, title } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
            const question =
                item && getQuestion({ state, quizChapterId, quizListItemId, questionId });

            console.log("GONNA UPDATE option title", title);

            if (question) {
                // @ts-ignore
                question.title = title;
            }
        },
        toggleQuestionsListOptionChecked(state, action) {
            const { quizListItemId, questionId } = action.payload;
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

            item &&
                item.questions.map((question) => {
                    if (question.id === questionId) {
                        return (question.isTrue = !question.isTrue);
                    } else {
                        return (question.isTrue = false);
                    }
                });
        },
        openAllAnswerFields(state, action) {
            // const { quizListItemId } = action.payload;
            // const item = state.quizList.find((item) => item.id === quizListItemId);

            // if (item) {
            //     return item.questions.map((question) => (question.isOpen = true));
            // }
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);

            chapter?.chapterQuestions.map((item) => {
                const modifiedItem =
                    item.id === action.payload &&
                    item.questions.map((question) => (question.isOpen = true));

                if (modifiedItem) {
                    return {
                        ...modifiedItem,
                    };
                } else {
                    return {
                        ...item,
                    };
                }
            });
        },
        closeAllAnswerFields(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const item = chapter?.chapterQuestions.find((item) => item.id === action.payload);
            console.log("REDUCER closeAllAnswerFields payload", JSON.stringify(item));

            item &&
                item.questions.map((question) => {
                    return (question.isOpen = false);
                });
        },
        closeTotallyAllAnswerFields(state) {
            state.quizList.map((item) =>
                item.chapterQuestions.map((chapterQuestion) =>
                    chapterQuestion.questions.map((question) => {
                        return (question.isOpen = false);
                    }),
                ),
            );
        },
        setListItemActive(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);
            const activeItem = chapter?.chapterQuestions.find((item) => item.id === action.payload);

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
    removeQuizListItemImg,
    updateQuizChapterTitle,
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
    closeTotallyAllAnswerFields,
    setListItemActive,
    toggleTitle,
} = quizListSlice.actions;

export const quizListPostAsync = (quizList: quizListType): AppThunk => (dispatch) => {
    setTimeout(() => {
        dispatch(postQuizList(quizList));
        window.localStorage.setItem("quizList", JSON.stringify(quizList)); // TODO: save to DB instead of localStorage
    }, 1000);
};

export const getListSelector = (state: RootState) => {
    const data = JSON.parse(window.localStorage.getItem("quizList") || "{}");
    const res = state.quizList || data?.quizList;
    return res.quizList;
};

export const getCurrentChapterSelector = (chapterId: string) =>
    createSelector(getListSelector, (list) => list.find((chapter) => chapter.id === chapterId));

export const getCurrentListItemSelector = (id: string) =>
    createSelector(getListSelector, (list) => {
        const chapter = list.find((chapter) => chapter.id === quizChapterId);
        return chapter?.chapterQuestions.find((item) => item.id === id);
    });

export const getCurrentListItemOptionsSelector = (quizQuestionId: string) =>
    createSelector(getListSelector, (list) => {
        const chapter = list.find((chapter) => chapter.id === quizChapterId);
        return chapter?.chapterQuestions.find((item) => item.id === quizQuestionId);
    });

// export const getCurrentListItemOptionsStatusSelector = (
//     quizListItemId: string,
//     quizQuestionId: string,
// ) =>
//     createSelector(getListSelector, (list) => {
//         const item = list.find((item) => item.id === quizListItemId);
//         const question = item?.questions.find((question) => question.id === quizQuestionId);
//         return question && question.isTrue;
//     });

export const getCurrentListItemOptionsOpenAnswerSelector = (
    quizListItemId: string,
    quizQuestionId: string,
) =>
    createSelector(getListSelector, (list) => {
        const chapter = list.find((chapter) => chapter.id === quizChapterId);
        const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
        const question = item?.questions.find((question) => question.id === quizQuestionId);
        console.log(
            "From selector check if ANSWER open",
            question?.isOpen,
            "quizListItemId: ",
            quizListItemId,
            "quizQuestionId: ",
            quizQuestionId,
        );
        return !!question?.isOpen;
    });

export const getCurrentListItemOptionsAnswerStatusSelector = (
    quizListItemId: string,
    quizQuestionId: string,
) =>
    createSelector(getListSelector, (list) => {
        const chapter = list.find((chapter) => chapter.id === quizChapterId);
        const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
        const question = item?.questions.find((question) => question.id === quizQuestionId);
        return question ? question.isTrue : false;
    });

export const getCurrentListItemIdSelector = (state: RootState, quizQuestionId: number) =>
    createSelector(getListSelector, (list) => {
        // list.filter(item => item.id === quizQuestionId)[0].id
    });

export default quizListSlice.reducer;
