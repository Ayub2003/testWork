import { addPost } from "../../redux/store/postsSlice/posts.slice";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PostsRoute.module.scss";
import { AppState } from "@/redux/store/store";
import { IPost } from "@/redux/store/postsSlice/posts.model";
import { getPosts } from "../../service/posts.service";
import { PostCard } from "./PostCard";
import { WindowBlur } from "../other/WindowBlur";
import { IoMdAddCircleOutline } from "react-icons/io";

export const PostsRoute: FC = () => {
  const dispatch = useDispatch();
  const selectedPosts = useSelector((state: AppState) => state.posts.posts);
  useEffect(() => {
    getPosts().catch(console.error);
  }, []);

  return (
    <div>
      <WindowBlur>
        <div className={styles.addPost}>
          <IoMdAddCircleOutline className={styles.logo} />
        </div>
      </WindowBlur>
      {selectedPosts?.map((element: IPost, index) => (
        <PostCard post={element} key={index} />
      ))}
    </div>
  );
};
