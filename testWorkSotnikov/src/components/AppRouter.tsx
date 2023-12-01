import {FC, Fragment} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "../routes";
import { POSTS_ROUTE } from "../utils/consts";
import { Layout } from "./Layout";

export const AppRouter: FC = () => {
  return (
    <Layout>
      <Routes>
        {publicRoutes.map(({ path, Component }, index) => (
          <Fragment key={index}>
            <Route path={path} element={<Component />} />
            <Route
              path={"*"}
              element={<Navigate key={index} to={POSTS_ROUTE} />}
            />
          </Fragment>
        ))}
      </Routes>
    </Layout>
  );
};
