import { createSlice } from '@reduxjs/toolkit';
import {
  fetchItems,
  addItem,
  deleteItem,
  updateItem,
  fetchItem,
} from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isAdding: false,
  isOpening: false,
  isUpdating: false,
  isDeleting: false,
};

const Error = {
  AUTH: 'Authentication token expired.',
  UNKNOWN: 'Unknown backend error occurred.',
};

const handleError = (state, error) => {
  if (error.statusText === 'Unauthorized') {
    state.isTokenExpired = true;
    return Error.AUTH;
  }

  return Error.UNKNOWN;
};

// We can mutate state below because of integrated IMMER lib only!

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItems.pending]: state => {
      state.isLoading = true;
    },
    [fetchItems.fulfilled]: (state, { payload }) => {
      state.items = payload.sort((a, b) => a.name.localeCompare(b.name));
      state.isLoading = false;
    },
    [fetchItems.rejected]: (state, { payload }) => {
      handleError(state, payload);
      state.isLoading = false;
    },

    [fetchItem.pending]: state => {
      state.isOpening = true;
    },
    [fetchItem.fulfilled]: (state, { payload }) => {
      state.items = payload.sort((a, b) => a.name.localeCompare(b.name));
      state.isOpening = false;
    },
    [fetchItem.rejected]: (state, { payload }) => {
      handleError(state, payload);
      state.isOpening = false;
    },

    [addItem.pending]: state => {
      state.isAdding = true;
    },
    [addItem.fulfilled]: (state, { payload }) => {
      state.items.push(payload);
      state.items.sort((a, b) => a.name.localeCompare(b.name));
      state.isAdding = false;
    },
    [addItem.rejected]: (state, { payload }) => {
      state.isAdding = false;
    },

    [deleteItem.pending]: state => {
      state.isDeleting = true;
    },
    [deleteItem.fulfilled]: (state, { meta }) => {
      state.items = state.items.filter(item => item.id !== meta.arg);
      state.isDeleting = false;
    },
    [deleteItem.rejected]: (state, { payload }) => {
      state.isDeleting = false;
    },

    [updateItem.pending]: state => {
      state.isUpdating = true;
    },
    [updateItem.fulfilled]: (state, { payload }) => {
      const outdatedItem = state.items.find(item => item.id === payload.id);
      outdatedItem.name = payload.name;
      outdatedItem.number = payload.number;
      state.items.sort((a, b) => a.name.localeCompare(b.name));
      state.isUpdating = false;
    },
    [updateItem.rejected]: (state, { payload }) => {
      state.isUpdating = false;
    },
  },
});

export const { reducer: productsReducer } = slice;
// export const {} = slice.actions;
