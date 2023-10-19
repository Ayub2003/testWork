import { FC } from "react";
import styles from "./AddPostWindow.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromFavorite,
  deletePostById,
  switchDeletePostDialogWindow,
} from "../../redux/store/postsSlice/posts.slice";
import { animated } from "@react-spring/web";
import {AppState, AppDispatch} from "@/redux/store/store";
import { IPost } from "../../redux/store/postsSlice/posts.model";

export const DeletePostWindow: FC<any> = (props) => {
  const { springStyle } = props;

  const dispatch: AppDispatch = useDispatch();

  const favoriteIdList = useSelector(
    (state: AppState) => state.posts.favoriteIdList
  );

  const deletePostData = useSelector(
    (state: AppState) => state.posts.deletePostData
  );

  const deletePostCard = (post: IPost) => {
    dispatch(switchDeletePostDialogWindow(false));
    dispatch(deletePostById(post.id));
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
          style={{ backgroundColor: "rgb(183,65,54)" }}
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
