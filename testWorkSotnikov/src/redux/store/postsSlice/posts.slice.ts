import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPost, IUser } from "./posts.model";
import { postsInitialState } from "./posts.init";

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
    },
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
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
    switchAddPostDialogWindow: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpenAddPostDialogWindow = payload;
    },
    switchDeletePostDialogWindow: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isOpenDeletePostDialogWindow = payload;
    },
    switchEditPostDialogWindow: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isOpenEditPostDialogWindow = payload;
    },
    setEditPostData: (state, { payload }: PayloadAction<IPost>) => {
      state.editPostData = payload;
    },
    setDeletePostData: (state, { payload }: PayloadAction<IPost>) => {
      state.deletePostData = payload;
    },
    addInFavorite: (state, { payload }: PayloadAction<number>) => {
      state.favoriteIdList.push(payload);
    },
    deleteFromFavorite: (state, { payload }: PayloadAction<number>) => {
      state.favoriteIdList.forEach((el, i) => {
        if (el == payload) state.favoriteIdList.splice(i, 1);
      });
    },
   
  },
});

export const {
  setPosts,
  setUsers,
  addPost,
  deletePost,
  switchAddPostDialogWindow,
  switchDeletePostDialogWindow,
  switchEditPostDialogWindow,
  setEditPostData,
  addInFavorite,
  deleteFromFavorite,
  setDeletePostData,
} = postsSlice.actions;
export const postsSliceReducer = postsSlice.reducer;
