import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        searchValue: '',
        categoryId: 0,
        currentPage: 1,
        sort: {
            name: 'популярности',
            sortProperty: 'rating'
        },
        orderBy: 'asc',
    },
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setOrderBy(state, action) {
            state.orderBy = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.page);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },

    }
})

export const selectSort = state => state.filter.sort;
export const selectFilter = state => state.filter;

export const { setCategoryId, setSortType, setOrderBy, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer