import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";


const cartAdapter = createEntityAdapter();


const cartSlice = createSlice({
    name: 'cart',
    initialState: cartAdapter.getInitialState(),
    reducers: {
        itemAdded(state, action) {
            cartAdapter.addOne(state, action.payload)
        },
        itemRemoved(state, action) {
            cartAdapter.removeOne(state, action.payload)
        },
        removeAll(state) {
            cartAdapter.removeAll(state);
        }
    }
});


export const { itemAdded, itemRemoved, removeAll } = cartSlice.actions;
export default cartSlice.reducer;

export const {
    selectAll: selectAllItems,
    selectTotal: SelectTotalItems,
} = cartAdapter.getSelectors(state => state.cart)