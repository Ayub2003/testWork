import { FC, PropsWithChildren } from "react";
import { MobileNavbar } from "./mobileComponents/MobileNavbar";
import styles from "./Layout.module.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <main>{children}</main>

      <menu>
        <MobileNavbar />
      </menu>
    </div>
  );
};
