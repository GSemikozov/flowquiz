export type questionsItem = {
    id: string;
    title: string;
    isTrue: boolean;
    answer?: string;
};

export type quizListItemType = {
    id: string;
    title: {
        text: string;
        isVisible: boolean;
    };
    description?: string;
    description2?: string;
    imageUrl?: string;
    isActive?: boolean;
    completed?: boolean;
    questions?: questionsItem[];
};

export type quizListType = quizListItemType[];
