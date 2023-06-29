import { FC } from "react";
import styles from "./AddPostWindow.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  deletePost,
  switchEditPostDialogWindow,
} from "../../redux/store/postsSlice/posts.slice";
import { animated } from "@react-spring/web";
import { AppState } from "@/redux/store/store";

export const EditPostWindow: FC<{ springStyle: any }> = (props) => {
  const { springStyle } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const editPostData = useSelector(
    (state: AppState) => state.posts.editPostData
  );
  const onSubmit = (data: any) => {
    dispatch(switchEditPostDialogWindow(false));
    dispatch(deletePost(editPostData));
    dispatch(
      addPost({
        userId: Number(data.userId),
        id: Number(data.id),
        title: data.title,
        body: data.body,
      })
    );
  };
  const fields = [
    { field: "userId", value: editPostData.userId },
    { field: "id", value: editPostData.id },
    { field: "title", value: editPostData.title },
    { field: "body", value: editPostData.body },
  ];

  return (
    <div className={styles.windowWrapper}>
      <animated.div style={springStyle} className={styles.window}>
        <p>Изменить пост</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <input
              defaultValue={field.value}
              placeholder={field.field}
              {...register(field.field, { required: true })}
              type={
                field.field === "userId" || field.field === "id"
                  ? "number"
                  : "text"
              }
            />
          ))}

          <input type="submit" value="Изменить" />
        </form>
        <button
          onClick={() => {
            dispatch(switchEditPostDialogWindow(false));
          }}
        >
          Отмена
        </button>
      </animated.div>
    </div>
  );
};
