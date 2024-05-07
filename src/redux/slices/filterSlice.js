import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        categoryId: 0,
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
        setOrderBy(state, action) {
            state.orderBy = action.payload;
        },
    }
})

export const { setCategoryId, setSortType, setOrderBy } = filterSlice.actions;

export default filterSlice.reducer