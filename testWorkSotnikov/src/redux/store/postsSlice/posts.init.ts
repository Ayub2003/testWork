import { IPosts } from "./posts.model";

const post = { userId: 0, id: 0, title: "", body: "" };

export const postsInitialState: IPosts = {
  posts: [],
  users: [],
  isOpenAddPostDialogWindow: false,
  isOpenDeletePostDialogWindow: false,
  isOpenEditPostDialogWindow: false,
  editPostData: post,
  deletePostData: post,
  favoriteIdList: [],
  postsLoadStatus: "empty",
  usersLoadStatus: "empty",
};
