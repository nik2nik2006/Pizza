import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        categoryId: 0,
        currentPage: 1,
        sort: {
            name: 'популярности',
            sortProperty: 'rating'
        },
        orderBy: 'asc',
    },
    reducers: {
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

export const { setCategoryId, setSortType, setOrderBy, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer