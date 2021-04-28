import { createSelector, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { quizListType } from "./types";
import { getUuid } from "../../helpers";
import { ChapterQuestionType } from "./QuizItemsList";

const initialState = {
    quizList: [
        {
            id: "1234567890",
            title: "Section 1",
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
        {
            id: "0987654321",
            title: "Section 2",
            chapterQuestions: [
                {
                    id: "5d23aae4-f7f9-4683-9db5-868435452781",
                    title: {
                        text: "Title 3",
                        isVisible: true,
                    },
                    description: "",
                    description2: "",
                    imageUrl: "",
                    isActive: false,
                    completed: false,
                    questions: [
                        {
                            id: "5dfgcba",
                            title: "Option",
                            answer: "",
                            isOpen: false,
                            isTrue: false,
                        },
                    ],
                },
                {
                    id: "5d23aae4-f7f9-4683-9db5-868435452782",
                    title: {
                        text: "Title 4",
                        isVisible: true,
                    },
                    description: "",
                    description2: "",
                    imageUrl: "",
                    isActive: false,
                    completed: false,
                    questions: [
                        {
                            id: "5abcdfg",
                            title: "Option 3",
                            answer: "",
                            isOpen: false,
                            isTrue: false,
                        },
                        {
                            id: "5abcdefgh",
                            title: "Option 4",
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
        title: "Untitled section",
        chapterQuestions: [
            {
                id: getUuid(),
                title: {
                    text: "Untitled page",
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
                        title: "Untitled option",
                        answer: "",
                        isOpen: false,
                        isTrue: false,
                    },
                ],
            },
        ],
    };
};

const getDummyChapterOption = () => {
    return {
        id: getUuid(),
        title: {
            text: "Untitled page",
            isVisible: true,
        },
        description: "",
        description2: "",
        imageUrl: "",
        isActive: false,
        completed: false,
        questions: [
            {
                id: getUuid(),
                title: "Untitled option",
                answer: "",
                isOpen: false,
                isTrue: false,
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
        duplicateQuizListItem(state, action) {
            const currentItem = state.quizList.find((item) => item.id === action.payload);
            const chapterQuestions = currentItem?.chapterQuestions.map((chapterQuestion) => {
                const questions = chapterQuestion?.questions.map((question) => {
                    return {
                        ...question,
                        id: getUuid(),
                    };
                });
                return {
                    ...chapterQuestion,
                    id: getUuid(),
                    questions: questions,
                };
            });
            const duplicatedItem = {
                ...currentItem,
                id: getUuid(),
                chapterQuestions: chapterQuestions,
            };
            console.log("currentItem", currentItem);
            console.log("duplicatedItem", duplicatedItem);
            if (duplicatedItem) {
                // @ts-ignore
                state.quizList.push(duplicatedItem);
            }
        },
        removeQuizListItem(state, action) {
            state.quizList = state.quizList.filter((item) => item.id !== action.payload);
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
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );

                if (item) {
                    // @ts-ignore
                    item.title.text = title;
                }
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
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                if (item) {
                    // @ts-ignore
                    item.description = description;
                }
            }
        },
        updateQuizListItemDescription2(state, action) {
            const { description2, quizListItemId } = action.payload;
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                if (item) {
                    // @ts-ignore
                    item.description2 = description2;
                }
            }
        },
        updateQuizListItemImg(state, action) {
            const { imageUrl, quizListItemId } = action.payload;
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                if (item) {
                    // @ts-ignore
                    item.imageUrl = imageUrl;
                }
            }
        },
        removeQuizListItemImg(state, action) {
            const { quizListItemId } = action.payload;
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                if (item) {
                    // @ts-ignore
                    item.imageUrl = "";
                }
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
        addNewChapterItem(state, action) {
            const chapter = state.quizList.find(
                (chapter) => chapter.id === action.payload.chapterId,
            );

            if (chapter) {
                // @ts-ignore
                chapter.chapterQuestions.push(getDummyChapterOption());
            }
        },
        duplicateChapterItem(state, action) {
            let chapterId: string | undefined = undefined;
            let chapterItem = undefined;
            let duplicatedChapterItem = undefined;

            state.quizList.forEach((chapter) => {
                chapter.chapterQuestions.forEach((chapterQuestion) => {
                    if (chapterQuestion.id === action.payload.chapterItemId) {
                        chapterItem = chapterQuestion;
                        chapterId = chapter.id;
                    }
                });
            });

            if (chapterItem) {
                // @ts-ignore
                // chapter.chapterQuestions.push(getDummyChapterOption());
                const chapterItemQuestions = chapterItem?.questions.map((question) => {
                    return {
                        ...question,
                        id: getUuid(),
                    };
                });

                duplicatedChapterItem = {
                    // @ts-ignore
                    ...chapterItem,
                    id: getUuid(),
                    questions: chapterItemQuestions,
                };
            }

            if (duplicatedChapterItem) {
                // @ts-ignore
                const currentChapter = state.quizList.find((chapter) => chapter.id === chapterId);
                currentChapter?.chapterQuestions.push(duplicatedChapterItem);
            }
        },
        removeChapterItem(state, action) {
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === action.payload.chapterItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);

                if (chapter) {
                    chapter.chapterQuestions = chapter.chapterQuestions.filter(
                        (chapterQuestion) => chapterQuestion.id !== action.payload.chapterItemId,
                    );
                }
            }
        },
        addNewOption(state, action) {
            const chapter = state.quizList.find((chapter) => chapter.id === quizChapterId);

            if (chapter) {
                // @ts-ignore
                chapter.chapterQuestions.push(getDummyChapterOption());
            }
        },
        addQuestionsListOption(state, action) {
            const { quizListItemId, quizListItemOption } = action.payload;
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                if (item) {
                    // @ts-ignore
                    item.questions.push(quizListItemOption);
                }
            }
        },
        removeQuestionsListOption(state, action) {
            const { quizListItemId, questionId } = action.payload;
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                if (item) {
                    // @ts-ignore
                    item.questions = item.questions.filter(
                        (question) => question.id !== questionId,
                    );
                }
            }
        },
        toggleQuestionsListOption(state, action) {
            const { quizListItemId, questionId } = action.payload;
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);

                const question =
                    item &&
                    getQuestion({
                        ...state,
                        ...quizListItemId,
                        ...questionId,
                    });

                if (question) {
                    // @ts-ignore
                    question.isTrue = !item.isTrue;
                }
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
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find(
                    (item: any) => item.id === quizListItemId,
                );
                const question =
                    item &&
                    getQuestion({ state, quizChapterId: chapterId, quizListItemId, questionId });

                if (question) {
                    // @ts-ignore
                    question.answer = answer;
                }
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
            let chapterId: string | undefined = undefined;

            state.quizList.forEach((chapter) => {
                const filteredChapterQuestion = chapter.chapterQuestions.find(
                    (chapterQuestion) => chapterQuestion.id === quizListItemId,
                );
                if (filteredChapterQuestion) {
                    chapterId = chapter.id;
                }
            });

            if (chapterId) {
                const chapter = state.quizList.find((chapter) => chapter.id === chapterId);
                const item = chapter?.chapterQuestions.find(
                    (item: any) => item.id === quizListItemId,
                );
                item &&
                    item.questions.map((question) => {
                        if (question.id === questionId) {
                            return (question.isTrue = true);
                        } else {
                            return (question.isTrue = false);
                        }
                    });
            }
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
    removeQuizListItem,
    duplicateQuizListItem,
    duplicateChapterItem,
    addNewOption,
    addNewChapterItem,
    removeChapterItem,
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

export const isChapterSelector = (id: string) =>
    createSelector(getListSelector, (list) => list.find((chapter) => chapter.id === id));

export const getCurrentChapterSelector = (chapterId: string) =>
    createSelector(
        getListSelector,
        isChapterSelector(chapterId),
        (list, isChapter) => isChapter && list.find((chapter) => chapter.id === chapterId),
    );

export const getItemSelector = (id: string) =>
    createSelector(getListSelector, (list) => {
        let x = undefined;
        list.forEach((chapter) => {
            const item = chapter?.chapterQuestions.find((item) => item.id === id);
            if (!!item) {
                x = item;
            }
        });
        return x;
    });

// export const isChapterSelectedSelector = (id: string) =>
//     createSelector(getListSelector, (list) => list.)

export const getCurrentListItemSelector = (id: string) =>
    createSelector(getListSelector, (list) => {
        // const chapter = list.find((chapter) => chapter.id === quizChapterId);
        // return chapter?.chapterQuestions.find((item) => item.id === id);
        let x = {} as ChapterQuestionType;
        list.forEach((chapter) => {
            const questions = chapter.chapterQuestions.find((question) => question.id === id);
            if (questions) {
                return (x = questions);
            }
        });
        return x;
    });

export const getListItemByIdSelector = (id: string) =>
    createSelector(getListSelector, (list) => {
        const chapter = list.find((chapter) => chapter.id === id);
        if (chapter) {
            return chapter;
        } else {
            let x = undefined;
            list.forEach((chapter) => {
                const item = chapter?.chapterQuestions.find((item) => item.id === id);
                if (!!item) {
                    x = item;
                }
            });
            return x;
        }
    });

export const getCurrentListItemOptionsSelector = (quizQuestionId: string) =>
    createSelector(getListSelector, (list) => {
        let x = {} as ChapterQuestionType;
        list.forEach((chapter) => {
            const questions = chapter.chapterQuestions.find(
                (question) => question.id === quizQuestionId,
            );
            if (questions) {
                return (x = questions);
            }
        });
        return x;
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
        // const chapter = list.find((chapter) => chapter.id === quizChapterId);
        // const item = chapter?.chapterQuestions.find((item) => item.id === quizListItemId);
        // const question = item?.questions.find((question) => question.id === quizQuestionId);
        let chapterQuestion = {} as ChapterQuestionType;
        list.forEach((chapter) => {
            const chapterQuestions = chapter.chapterQuestions.find(
                (question) => question.id === quizListItemId,
            );
            if (chapterQuestions) {
                return (chapterQuestion = chapterQuestions);
            }
        });
        const question = chapterQuestion?.questions.find(
            (question) => question.id === quizQuestionId,
        );
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
        let chapterQuestion = {} as ChapterQuestionType;
        list.forEach((chapter) => {
            const chapterQuestions = chapter.chapterQuestions.find(
                (question) => question.id === quizListItemId,
            );
            if (chapterQuestions) {
                return (chapterQuestion = chapterQuestions);
            }
        });
        const question = chapterQuestion?.questions.find(
            (question) => question.id === quizQuestionId,
        );
        return question ? question.isTrue : false;
    });

export const getCurrentListItemIdSelector = (state: RootState, quizQuestionId: number) =>
    createSelector(getListSelector, (list) => {
        // list.filter(item => item.id === quizQuestionId)[0].id
    });

export default quizListSlice.reducer;
