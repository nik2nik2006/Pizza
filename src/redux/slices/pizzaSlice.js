import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',async ({ currentPage, category, search, sort, orderBy }) => {
    // const { currentPage, category, search, sort, orderBy } = params;
    const { data } = await axios.get(
        `https://6603e6a62393662c31d00976.mockapi.io/items?page=${currentPage}&limit=4&${
            category}${
            search}&sortBy=${sort.sortProperty}&order=${orderBy}`,)
        return data;
    },
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        items: [],
        status: 'loading', // loading | success | error
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });
    },
})

export default pizzaSlice.reducer