import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost } from "./posts.model";
import { postsInitialState } from "./posts.init";

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
    },
    addPost: (state, { payload }: PayloadAction<IPost>) => {
      state.posts.unshift(payload);
      console.log(state.posts.length);
    },
    deletePost: (state, { payload }: PayloadAction<IPost>) => {
      state.posts.forEach((el, i) => {
        if (el.id == payload.id && el.userId == payload.userId)
          state.posts.splice(i, 1);
      });
    },
  },
});

export const { setPosts, addPost, deletePost } = postsSlice.actions;
export const postsSliceReducer = postsSlice.reducer;
