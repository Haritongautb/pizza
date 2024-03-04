export const enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type SortTypeItems = {
    // мы так сделали, а не написали просто id: string, потому что в initialState если мы захотим поменять в id к примеру на id: "title", то будет ошибка. так что пишем здесь варианты возможных свойств id для initialState
    id: SortPropertyEnum;
    title: 'по популярности (DESC)' | 'по популярности (ASC)' | 'по цене (DESC)' | 'по цене (ASC)' | 'по алфавиту (DESC)' | 'по алфавиту (ASC)';
}

export interface FilterSliceState {
    search?: string,
    categoryId: number,
    currentPage: number,
    sortType: SortTypeItems;
}