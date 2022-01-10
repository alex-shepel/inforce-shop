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
  error: null,
  isLoading: false,
  isAdding: false,
  isOpening: false,
  isUpdating: false,
  deletingIds: [],
};

const Error = {
  NOT_FOUND: 'Such item is not found.',
  SERVER_ERROR: 'Unknown server error occurred.',
};

const handleError = (state, { status }) => {
  switch (status) {
    case 404:
      state.error = Error.NOT_FOUND;
      break;
    case 500:
      state.error = Error.SERVER_ERROR;
      break;
    default:
      state.error = Error.SERVER_ERROR;
  }
};

// We can mutate state below because of integrated IMMER lib only!

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchItems.pending]: state => {
      state.error = null;
      state.isLoading = true;
      state.viewItem = null;
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
      state.error = null;
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
      state.error = null;
      state.isAdding = true;
    },
    [addItem.fulfilled]: (state, { payload }) => {
      state.items.push(payload);
      state.items.sort((a, b) => a.name.localeCompare(b.name));
      state.isAdding = false;
    },
    [addItem.rejected]: (state, { payload }) => {
      handleError(state, payload);
      state.isAdding = false;
    },

    [deleteItem.pending]: (state, { meta }) => {
      state.error = null;
      state.deletingIds.push(meta.arg);
    },
    [deleteItem.fulfilled]: (state, { meta }) => {
      state.items = state.items.filter(item => item.id !== meta.arg);
      state.deletingIds = state.deletingIds.filter(id => id !== meta.arg);
    },
    [deleteItem.rejected]: (state, { meta, payload }) => {
      handleError(state, payload);
      state.deletingIds = state.deletingIds.filter(id => id !== meta.arg);
    },

    [updateItem.pending]: state => {
      state.error = null;
      state.isUpdating = true;
    },
    [updateItem.fulfilled]: (state, { payload }) => {
      state.viewItem = { ...state.viewItem, ...payload };
      state.isUpdating = false;
    },
    [updateItem.rejected]: (state, { payload }) => {
      handleError(state, payload);
      state.isUpdating = false;
    },
  },
});

export const { reducer: productsReducer } = slice;
