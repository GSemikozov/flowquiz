export type questionsItem = {
    id: number;
    title: string;
    isTrue: boolean;
    answer?: string;
};

export type quizListItemType = {
    id: number;
    title: string;
    description?: string;
    description2?: string;
    imageUrl?: string;
    isActive?: boolean;
    completed?: boolean;
    questions?: questionsItem[];
};

export type quizListType = quizListItemType[];
