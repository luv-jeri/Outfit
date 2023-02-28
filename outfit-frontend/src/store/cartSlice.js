import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const index = state.data.findIndex((i) => i.id === item.id);
      if (index === -1) {
        state.data.push({
          ...item,
          quantity: 1,
        });
      } else {
        state.data[index].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const index = state.data.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (state.data[index].quantity === 1) {
          state.data.splice(index, 1);
        } else {
          state.data[index].quantity -= 1;
        }
      } else {
        console.warn(`Can't remove product (id: ${item.id}) as its not in cart!`);
      }
    },
    setCart: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
