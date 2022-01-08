import { createSlice } from '@reduxjs/toolkit';
import {
  fetchItems,
  addItem,
  deleteItem,
  updateItem,
  fetchItem,
} from './operations';

const initialState = {
  items: null,
  viewItem: null,
  isLoading: false,
  isAdding: false,
  isOpening: false,
  isUpdating: false,
  deletingIds: [],
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
      state.viewItem = null;
      state.isOpening = true;
    },
    [fetchItem.fulfilled]: (state, { payload }) => {
      state.viewItem = payload;
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

    [deleteItem.pending]: (state, { meta }) => {
      state.deletingIds.push(meta.arg);
    },
    [deleteItem.fulfilled]: (state, { meta }) => {
      state.items = state.items.filter(item => item.id !== meta.arg);
      state.deletingIds = state.deletingIds.filter(id => id !== meta.arg);
    },
    [deleteItem.rejected]: (state, { meta, payload }) => {
      state.deletingIds = state.deletingIds.filter(id => id !== meta.arg);
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
