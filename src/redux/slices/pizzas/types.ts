// I.
// Record<ключ, значение>;
// если все значение - это string, и чтобы не писать каждый раз разные свойства с одним и тем же значение string
/* type FetchPizzasArgs = Record<string, string>; */

export type FetchPizzasArgs = {
    currentPage: number;
    _searchValue: string; 
    _category: string; 
    _sortBy: string; 
    _order: string;
}


export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[]
    category: number;
    rating: number;
}

export enum Status {
    WAITING = 'waiting',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'

}

// interface - используем только для initialState. Это неформальное правило
export interface PizzaSliceState {
    items: Pizza[],
    // в filterSLice есть объяснения почему мы пишем так, а не pizzasStatusLoading: string;
    pizzasStatusLoading: Status.WAITING | Status.LOADING | Status.LOADED | Status.ERROR;
}