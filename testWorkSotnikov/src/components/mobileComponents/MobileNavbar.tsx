import { FC } from "react";
import { WindowBlur } from "../other/WindowBlur";
import { NAVBAR_PARAMS } from "../../utils/consts";
import { Link, useLocation } from "react-router-dom";
import styles from "./MobileNavbar.module.scss";

export const MobileNavbar: FC = () => {
  const isThisPath = (link: string) => {
    const location = useLocation();
    if (location.pathname === link) {
      return {
        color: "#080B74",
        borderBottom: "#080B74 2px solid",
        transform: "scale(90%)",
      };
    }
  };
  return (
    <div className={styles.windowWrapper}>
      <WindowBlur>
        <div className={styles.wrapper}>
          {NAVBAR_PARAMS.map((param, index) => (
            <Link
              className={styles.navbutton}
              to={param.link}
              style={isThisPath(param.link)}
              key={index}
            >
              <param.Icon className={styles.icon} />
              <p>{param.title}</p>
            </Link>
          ))}
        </div>
      </WindowBlur>
    </div>
  );
};
