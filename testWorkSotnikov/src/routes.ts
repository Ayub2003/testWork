import { ImagesRoute } from "./components/imagesRoute/ImagesRoute";
import { PostsRoute } from "./components/postsRoute/PostsRoute";
import { TasksRoute } from "./components/tasksRoute/TasksRoute";
import { IMAGES_ROUTE, POSTS_ROUTE, TASKS_ROUTE } from "./utils/consts";
import { routeModel } from "./utils/interfaces";

export const publicRoutes: routeModel[] = [
  { path: POSTS_ROUTE, Component: PostsRoute },
  { path: TASKS_ROUTE, Component: TasksRoute },
  { path: IMAGES_ROUTE, Component: ImagesRoute },
];
