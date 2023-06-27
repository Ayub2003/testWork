import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    incrementByAction: (state, { payload }: PayloadAction<number>) => {
      state.value = state.value + payload;
    },
  },
});

export const { increment, decrement, reset, incrementByAction } =
  counterSlice.actions;
export const counterSliceReducer = counterSlice.reducer;
