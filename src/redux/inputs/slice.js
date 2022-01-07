import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
};

// We can mutate state below because of integrated IMMER lib only!

const slice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setIsTokenExpired: (state, { payload }) => {
      state.input = payload;
    },
  },
});

export const { reducer: inputsReducer } = slice;
export const { input } = slice.actions;
