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
    }
})

export const { setCategoryId, setSortType, setOrderBy, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer