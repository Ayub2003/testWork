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
  fetchUsers,
  switchAddPostDialogWindow, useGetAllPostsQuery
} from "../../redux/store/postsSlice/posts.slice";
import { useTransition } from "@react-spring/web";
import { EditPostWindow } from "./EditPostWindow";
import { DeletePostWindow } from "./DeletePostWindow";


const modalAnimation = {
  from: { opacity: 0, x:-500, y: 200, transform: 'rotate(-0.1turn)'  },
  enter: { opacity: 1, x: 0,y: 0, transform: "rotate(0turn)"},
  leave: { opacity: 0, x:500, y: 200, transform: 'rotate(0.1turn)'}
};

export const PostsRoute: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [limit, setLimit] = useState(10);
  const selectedPosts = useSelector((state: AppState) => state.posts.posts);
  const {isError, isLoading, isSuccess} = useGetAllPostsQuery(null)

  const isOpenAddPostDialogWindow = useSelector(
    (state: AppState) => state.posts.isOpenAddPostDialogWindow
  );
  const isOpenEditPostWindow = useSelector(
    (state: AppState) => state.posts.isOpenEditPostDialogWindow
  );
  const isOpenDeletePostDialogWindow = useSelector(
    (state: AppState) => state.posts.isOpenDeletePostDialogWindow
  );


  const transitionsAddPost = useTransition(
    isOpenAddPostDialogWindow,
    modalAnimation
  );
  const transitionsDeletePost = useTransition(
    isOpenDeletePostDialogWindow,
    modalAnimation
  );

  const transitionsEditPost = useTransition(isOpenEditPostWindow, modalAnimation);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  //bad code, need to fix with api-param '?limit=10/20/50/.../noLimit'
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
      {isError && (
        <WindowBlur>
          <h1>Ошибка сервера</h1>
        </WindowBlur>
      )}
      {isLoading && (
        <WindowBlur>
          <h1>loading...</h1>
        </WindowBlur>
      )}
      {isSuccess && (
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
