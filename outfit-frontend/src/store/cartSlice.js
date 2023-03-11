import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  loading: false,
};

export const addToCart = createAsyncThunk('cart/addToCart', async (parameters) => {
  const { id } = parameters;
  const { data } = await axios.post(`cart/${id}`);
  return data.data;
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (parameters) => {
    const { id } = parameters;
    const { data } = await axios.delete(`cart/${id}`);
    return data.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
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
    remove: (state, action) => {
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
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(removeFromCart.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { add, remove, setCart } = cartSlice.actions;
export default cartSlice.reducer;
