import {PayloadAction, createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import { IPost, IUser } from "./posts.model";
import { postsInitialState } from "./posts.init";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";



export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),
    getAllPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Post']

    }),
    addNewPost: builder.mutation({
      query: (post: IPost) => ({
        url: 'posts',
        method: 'POST',
        body: post
      }),
      // invalidatesTags: ['Post']
    }),

    deletePost: builder.mutation({
      query: (id: number) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      })
    }),

  }),
})
export const { useGetPostByIdQuery, useGetAllPostsQuery, useAddNewPostMutation, useDeletePostMutation } = postApi

// //------------------legacy------------
// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (_, { rejectWithValue  }) => {
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts"
//       );
//       if (!response.ok) {
//         throw new Error("Ошибка запроса данных");
//       }
//       const posts = await response.json();
//
//       return posts;
//     } catch (error) {
//         return rejectWithValue(error);
//     }
//   }
// );

// export const deletePostById = createAsyncThunk(
//     "posts/deletePostById",
//     async(id: number, {rejectWithValue, dispatch})=>{
//           try{
//             const response = await fetch(
//                 `https://jsonplaceholder.typicode.com/posts/${id}`,
//                 {method:'DELETE'})
//
//             if(!response.ok){
//               throw new Error('Ошибка удаления поста. Ошибка сервера')
//             }
//
//             dispatch(deletePost(id))
//
//           } catch (error){
//             return rejectWithValue(error)
//           }
// })

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
    deletePost: (state, { payload }: PayloadAction<number>) => {
      state.posts.forEach((el, i) => {
        if (el.id == payload)
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

    builder
        .addMatcher(postApi.endpoints?.getAllPosts.matchFulfilled,(state, { payload }) => {
          state.posts = payload;
          state.postsLoadStatus = "success";
        })
        .addMatcher(postApi.endpoints?.getAllPosts.matchPending, (state) => {
          state.postsLoadStatus = "loading";
        })
        .addMatcher(postApi.endpoints?.getAllPosts.matchRejected, (state) => {
          state.postsLoadStatus = "rejected";
        });

    builder
        .addMatcher(
        postApi.endpoints?.addNewPost.matchFulfilled,
        (state, { payload }: PayloadAction<IPost>) => {
          state.posts.unshift(payload);
        })
        .addMatcher(
            postApi.endpoints?.addNewPost.matchRejected,
            ()=> {console.log('Ошибка добавления поста')})

    builder
        .addMatcher(
            postApi.endpoints?.deletePost.matchFulfilled,
            (state, { payload }: PayloadAction<number>) => {
              console.log(current(state).posts)
              console.log('payload: ',payload)
              state.posts = state.posts.filter((element: IPost) => (element.id !== payload))
              console.log(current(state.posts))
              console.log('успешное удаление')
            }
        )
        .addMatcher(
            postApi.endpoints?.deletePost.matchRejected,
            ()=>{console.log('Ошибка удаления')}
        )


  }

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


