import { FC } from "react";
import styles from "./AddPostWindow.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addPost,
  switchAddPostDialogWindow,
} from "../../redux/store/postsSlice/posts.slice";
import { animated } from "@react-spring/web";

export const AddPostWindow: FC<any> = (props) => {
  const { springStyle } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    dispatch(switchAddPostDialogWindow(false));
    dispatch(
      addPost({
        userId: Number(data.userId),
        id: Number(data.id),
        title: data.title,
        body: data.body,
      })
    );
  };
  const fields = ["userId", "id", "title", "body"];

  return (
    <div className={styles.windowWrapper}>
      <animated.div style={springStyle} className={styles.window}>
        <p>Добавить пост</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <input
              placeholder={field}
              {...register(field, { required: true })}
              type={field === "userId" || field === "id" ? "number" : "text"}
            />
          ))}

          <input type="submit" value="Добавить" />
        </form>
        <button
          onClick={() => {
            dispatch(switchAddPostDialogWindow(false));
          }}
        >
          Отмена
        </button>
      </animated.div>
    </div>
  );
};
