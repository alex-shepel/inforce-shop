import * as api from 'services/shop-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const toPayload = data => {
  const { name, count, width, height, weight } = data;
  return {
    name,
    count,
    size: { width, height },
    weight,
  };
};

const fetchItems = createAsyncThunk(
  'products/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      return await api.getProducts();
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const fetchItem = createAsyncThunk(
  'products/fetchItem',
  async (id, { rejectWithValue }) => {
    try {
      return await api.getProduct(id);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const addItem = createAsyncThunk(
  'products/addItem',
  async (data, { rejectWithValue }) => {
    try {
      return await api.addProduct(toPayload(data));
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const deleteItem = createAsyncThunk(
  'products/deleteItem',
  async (id, { rejectWithValue }) => {
    try {
      return await api.deleteProduct(id);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const updateItem = createAsyncThunk(
  'products/updateItem',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await api.editProduct(id, toPayload(data));
    } catch (error) {
      console.log('error :', error);
      return rejectWithValue(error.response);
    }
  },
);

export { fetchItems, fetchItem, addItem, deleteItem, updateItem };
