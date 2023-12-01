import { configureStore } from "@reduxjs/toolkit";
import { counterSliceReducer } from "./testSlice/test.slice";
import {postApi, postsSliceReducer} from "./postsSlice/posts.slice";

export const store = configureStore({
  reducer: {
    counter: counterSliceReducer,
    posts: postsSliceReducer,
    [postApi.reducerPath]: postApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postApi.middleware)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
