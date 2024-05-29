import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        totalPrice: 0,
        items: [],

    },
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
                state.totalPrice += findItem.price;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
                state.totalPrice += action.payload.price;
            }
        },
        removeItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            findItem.count-= 1;
            state.totalPrice -= findItem.price;
        },
        clearItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id);
            state.totalPrice = state.items.reduce((sum, item) => sum + item.count * item.price, 0);
        },
        clearAllItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
})

export const selectCart = (state) => state.cart;
export const selectCartItemById = id => state => state.cart.items.find(obj => obj.id === id);

export const { addItem, removeItem, clearItem, clearAllItem } = cartSlice.actions;

export default cartSlice.reducer







