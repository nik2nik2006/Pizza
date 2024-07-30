import { createSlice } from '@reduxjs/toolkit'
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

const { items, totalPrice } = getCartFromLS()

export const cartSlice = createSlice({

    name: 'cart',
    initialState: {
        totalPrice,
        items,

    },
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            findItem.count-= 1;
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload.id);
            state.totalPrice = calcTotalPrice(state.items);
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







