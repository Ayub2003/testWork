import { BsFilePost } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";

export const TASKS_ROUTE = "/tasks";
export const POSTS_ROUTE = "/posts";
export const IMAGES_ROUTE = "/images";

export const NAVBAR_PARAMS = [
  { title: "Posts", link: POSTS_ROUTE, Icon: BsFilePost },
  { title: "Tasks", link: TASKS_ROUTE, Icon: FaTasks },
  { title: "Images", link: IMAGES_ROUTE, Icon: IoMdImages },
];

export const jsonPlaceholder = "https://jsonplaceholder.typicode.com/";
