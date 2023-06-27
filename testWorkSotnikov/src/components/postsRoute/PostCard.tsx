import { FC, useState } from "react";
import styles from "./PostCard.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineArrowBack } from "react-icons/md";
import { WindowBlur } from "../other/WindowBlur";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/store/postsSlice/posts.slice";
import { IPost } from "@/redux/store/postsSlice/posts.model";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useTransition, animated } from "@react-spring/web";

export const PostCard: FC<{ post: IPost }> = ({ post }) => {
  const dispatch = useDispatch();
  const [settingsToggle, setSettingsToggle] = useState(false);
  const transitions = useTransition(settingsToggle, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });
  const switchSettingsToggle = () => {
    setSettingsToggle(!settingsToggle);
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
              <li>
                <AiOutlineEdit />
                <p>Edit</p>
              </li>
              <li>
                <MdOutlineFavoriteBorder />
                <p>Like</p>
              </li>
              <li
                onClick={() => {
                  dispatch(deletePost(post));
                }}
              >
                <MdOutlineDelete />
                <p>Delete</p>
              </li>
            </ul>
          </div>
        </WindowBlur>
      ) : (
        <div className={styles.postcard}>
          <article>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
          <p onClick={switchSettingsToggle}>
            <BiDotsVerticalRounded />
          </p>
        </div>
      )}
    </>
  );
};
