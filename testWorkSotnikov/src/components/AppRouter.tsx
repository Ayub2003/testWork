import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "../routes";
import { POSTS_ROUTE } from "../utils/consts";
import { Layout } from "./Layout";

export const AppRouter: FC = () => {
  return (
    <Layout>
      <Routes>
        {publicRoutes.map(({ path, Component }, index) => (
          <>
            <Route key={index} path={path} element={<Component />} />
            <Route
              key={index}
              path={"*"}
              element={<Navigate key={index} to={POSTS_ROUTE} />}
            />
          </>
        ))}
      </Routes>
    </Layout>
  );
};
