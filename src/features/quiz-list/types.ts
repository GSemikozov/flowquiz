export type questionsItem = {
    id: number;
    title: string;
    isTrue: boolean;
    answer?: string;
};

export type quizListItemType = {
    id: number;
    title: string;
    completed: boolean;
    questions?: questionsItem[];
};

export type quizListType = quizListItemType[];
