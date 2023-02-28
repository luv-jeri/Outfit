import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  loading: false,
  page: 1,
  limit: 10,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (parameters, store) => {
    const { page, limit } = store.getState().products;
    const { limit: limitToUse, page: pageToUse } = parameters || {};
    const response = await axios.get(
      `product?limit=${limitToUse || limit}&page=${pageToUse || page}`
    );

    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.data = action.payload;
    },
    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductError: (state, action) => {
      state.error = action.payload;
    },
    setProductPage: (state, action) => {
      state.page = action.payload;
    },
    setProductLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.page++;
      state.data = action.payload.data;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const {
  setProduct,
  setProductLoading,
  setProductError,
  setProductPage,
  setProductLimit,
} = productSlice.actions;

export default productSlice.reducer;
