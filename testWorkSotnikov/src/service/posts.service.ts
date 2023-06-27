import { setPosts } from "../redux/store/postsSlice/posts.slice";
import { store } from "../redux/store/store";

export const getPosts = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await data.json();
  await store.dispatch(setPosts(posts));

  return posts;
};

export const getPostById = async (id: number) => {
  const post = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + id.toString()
  )
    .then((response) => response.json())
    .then((json) => {
      console.log("post: ", json);
    });

  return post;
};
