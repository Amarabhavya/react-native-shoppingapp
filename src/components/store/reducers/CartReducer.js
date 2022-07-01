import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ids: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFromCart: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

export const addToCart = cartSlice.actions.addToCart;
export const removeFromCart = cartSlice.actions.removeFromCart;
export default cartSlice.reducer;