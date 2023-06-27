import { FC, PropsWithChildren } from "react";
import styles from "./WindowBlur.module.scss";

export const WindowBlur: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <div className={styles.wrapper}>{children}</div>;
};
