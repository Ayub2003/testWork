import { FC, useState } from "react";
import styles from "./PostCard.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { WindowBlur } from "../other/WindowBlur";
import { useDispatch, useSelector } from "react-redux";
import {
  addInFavorite,
  deleteFromFavorite,
  setDeletePostData,
  setEditPostData,
  switchDeletePostDialogWindow,
  switchEditPostDialogWindow,
} from "../../redux/store/postsSlice/posts.slice";
import { IPost } from "@/redux/store/postsSlice/posts.model";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AppState } from "@/redux/store/store";

export const PostCard: FC<{ post: IPost }> = ({ post }) => {
  const dispatch = useDispatch();

  const [settingsToggle, setSettingsToggle] = useState(false);

  const favoriteIdList = useSelector(
    (state: AppState) => state.posts.favoriteIdList
  );

  const user = useSelector((state: AppState) => {
    for (let i = 0; i < state.posts.users.length; i++) {
      if (state.posts.users[i].id === post.userId) {
        return state.posts.users[i];
      }
    }
  });

  const switchSettingsToggle = () => {
    setSettingsToggle(!settingsToggle);
  };

  const openEditWindow = (post: IPost) => {
    dispatch(switchEditPostDialogWindow(true));
    dispatch(setEditPostData(post));
  };

  const openDeleteWindow = (post: IPost) => {
    dispatch(switchDeletePostDialogWindow(true));
    dispatch(setDeletePostData(post));
  };

  const switchLike = (post: IPost) => {
    if (favoriteIdList.includes(post.id)) {
      dispatch(deleteFromFavorite(post.id));
    } else {
      dispatch(addInFavorite(post.id));
    }
  };

  return (
    <>
      {settingsToggle ? (
        <WindowBlur>
          <div className={styles.postcardSettings}>
            <ul>
              <li onClick={switchSettingsToggle}>
                <MdOutlineArrowBack />
                <p>Back</p>
              </li>
              <li
                onClick={() => {
                  openEditWindow(post);
                }}
              >
                <AiOutlineEdit />
                <p>Edit</p>
              </li>
              <li
                style={{
                  color: favoriteIdList.includes(post.id)
                    ? " rgb(148, 0, 101)"
                    : "blue",
                  border: favoriteIdList.includes(post.id)
                    ? " rgb(148, 0, 101) 1px solid"
                    : "blue",
                }}
                onClick={() => {
                  switchLike(post);
                }}
              >
                <MdOutlineFavoriteBorder />
                <p>{favoriteIdList.includes(post.id) ? "liked" : "like"}</p>
              </li>
              <li
                onClick={() => {
                  openDeleteWindow(post);
                }}
              >
                <MdOutlineDelete />
                <p>Delete</p>
              </li>
            </ul>
          </div>
        </WindowBlur>
      ) : (
        <div
          className={styles.postcard}
          style={{
            border: favoriteIdList.includes(post.id)
              ? "blue 2px solid"
              : "black",
          }}
        >
          <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>username: {user?.username}</p>
            <p>email: {user?.email}</p>
          </article>
          <p onClick={switchSettingsToggle}>
            <BiDotsVerticalRounded />
          </p>
        </div>
      )}
    </>
  );
};
