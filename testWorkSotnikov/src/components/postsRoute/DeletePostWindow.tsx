import { FC } from "react";
import styles from "./AddPostWindow.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromFavorite,
  deletePost,
  switchDeletePostDialogWindow,
} from "../../redux/store/postsSlice/posts.slice";
import { animated } from "@react-spring/web";
import { AppState } from "@/redux/store/store";
import { IPost } from "../../redux/store/postsSlice/posts.model";

export const DeletePostWindow: FC<any> = (props) => {
  const { springStyle } = props;

  const dispatch = useDispatch();

  const favoriteIdList = useSelector(
    (state: AppState) => state.posts.favoriteIdList
  );

  const deletePostData = useSelector(
    (state: AppState) => state.posts.deletePostData
  );

  const deletePostCard = (post: IPost) => {
    dispatch(switchDeletePostDialogWindow(false));
    dispatch(deletePost(post));
    if (favoriteIdList.includes(post.id)) {
      dispatch(deleteFromFavorite(post.id));
    }
  };

  return (
    <div className={styles.windowWrapper}>
      <animated.div style={springStyle} className={styles.window}>
        <p>Удаление поста</p>
        <span>Вы уверены, что хотите удалить пост?</span>
        <button
          onClick={() => {
            deletePostCard(deletePostData);
          }}
          style={{ backgroundColor: "rgb(181, 8, 8)" }}
        >
          Удалить
        </button>
        <button
          onClick={() => {
            dispatch(switchDeletePostDialogWindow(false));
          }}
        >
          Отмена
        </button>
      </animated.div>
    </div>
  );
};
