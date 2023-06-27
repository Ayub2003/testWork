import { configureStore } from "@reduxjs/toolkit";
import { counterSliceReducer } from "./testSlice/test.slice";
import { postsSliceReducer } from "./postsSlice/posts.slice";

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    posts: postsSliceReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
