import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost, IUser } from "./posts.model";
import { postsInitialState } from "./posts.init";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Ошибка запроса данных");
      }
      const posts = await response.json();

      return posts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "posts/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Ошибка запроса данных");
      }
      const users = await response.json();

      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
        state.postsLoadStatus = "success";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.postsLoadStatus = "loading";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsLoadStatus = "rejected";
      });

    builder
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<IUser[]>) => {
          state.users = payload;
          state.usersLoadStatus = "success";
        }
      )
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoadStatus = "loading";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoadStatus = "rejected";
      });
  },
});

export const {
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
