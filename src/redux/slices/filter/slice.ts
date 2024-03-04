import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store";
import { FilterSliceState, SortPropertyEnum, SortTypeItems } from "./types";

const initialState: FilterSliceState = {
    search: '',
    categoryId: 0,
    currentPage: 1,
    sortType: {
        "id": SortPropertyEnum.RATING_DESC,
        "title": "по популярности (DESC)"
    }
}

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        setSortType: (state, action: PayloadAction<SortTypeItems>) => {
            state.sortType = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilters: (state, action: PayloadAction<FilterSliceState>) => {
            state.currentPage = action.payload.currentPage;
            state.categoryId = action.payload.categoryId;
            state.sortType = action.payload.sortType;
        }
    }
})

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearch } = filterSlice.actions;

export default filterSlice.reducer;