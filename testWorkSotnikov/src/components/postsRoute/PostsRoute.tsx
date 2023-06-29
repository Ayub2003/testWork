import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PostsRoute.module.scss";
import { AppDispatch, AppState } from "@/redux/store/store";
import { IPost } from "@/redux/store/postsSlice/posts.model";
import { PostCard } from "./PostCard";
import { WindowBlur } from "../other/WindowBlur";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AddPostWindow } from "./AddPostWindow";
import {
  fetchPosts,
  fetchUsers,
  switchAddPostDialogWindow,
} from "../../redux/store/postsSlice/posts.slice";
import { useTransition } from "@react-spring/web";
import { EditPostWindow } from "./EditPostWindow";
import { DeletePostWindow } from "./DeletePostWindow";

export const PostsRoute: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [limit, setLimit] = useState(10);
  const selectedPosts = useSelector((state: AppState) => state.posts.posts);

  const isOpenAddPostDialogWindow = useSelector(
    (state: AppState) => state.posts.isOpenAddPostDialogWindow
  );

  const isOpenEditPostWindow = useSelector(
    (state: AppState) => state.posts.isOpenEditPostDialogWindow
  );

  const isOpenDeletePostDialogWindow = useSelector(
    (state: AppState) => state.posts.isOpenDeletePostDialogWindow
  );

  const postsLoadStatus = useSelector(
    (state: AppState) => state.posts.postsLoadStatus
  );

  const usersLoadStatus = useSelector(
    (state: AppState) => state.posts.usersLoadStatus
  );

  const animation = {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  };

  const transitionsAddPost = useTransition(
    isOpenAddPostDialogWindow,
    animation
  );

  const transitionsDeletePost = useTransition(
    isOpenDeletePostDialogWindow,
    animation
  );

  const transitionsEditPost = useTransition(isOpenEditPostWindow, animation);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const nextLimit = () => {
    if (limit < 20) {
      setLimit(limit + 10);
    } else if (limit >= 20 && limit < 50) {
      setLimit(limit + 30);
    } else if (limit >= 50 && limit < 100) {
      setLimit(limit + 50);
    } else setLimit(10000);
  };

  return (
    <div className={styles.wrapper}>
      {(postsLoadStatus === "rejected" || usersLoadStatus === "rejected") && (
        <WindowBlur>
          <h1>Ошибка сервера</h1>
        </WindowBlur>
      )}
      {(postsLoadStatus === "loading" || usersLoadStatus === "loading") && (
        <WindowBlur>
          <h1>loading...</h1>
        </WindowBlur>
      )}
      {postsLoadStatus === "success" && usersLoadStatus === "success" && (
        <>
          {" "}
          <WindowBlur>
            <div
              className={styles.addPost}
              onClick={() => {
                dispatch(switchAddPostDialogWindow(true));
              }}
            >
              <IoMdAddCircleOutline className={styles.logo} />
            </div>
          </WindowBlur>
          {selectedPosts?.map(
            (element: IPost, index) =>
              index < limit && <PostCard post={element} key={index} />
          )}
          {transitionsAddPost(
            (style, item) => item && <AddPostWindow springStyle={style} />
          )}
          {transitionsEditPost(
            (style, item) => item && <EditPostWindow springStyle={style} />
          )}
          {transitionsDeletePost(
            (style, item) => item && <DeletePostWindow springStyle={style} />
          )}
          {selectedPosts.length > limit && (
            <button onClick={nextLimit}>Еще</button>
          )}
        </>
      )}
    </div>
  );
};
