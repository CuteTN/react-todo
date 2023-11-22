import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/HomePage/Home.page";
import { TasksListPage } from "../../pages/TasksListPage/TasksList.page";
import { AddTaskPage } from "../../pages/TaskForm/AddTask.page";
import { EditTaskPage } from "../../pages/TaskForm/EditTask.page";

export const ROUTES = {
  home: {
    path: "/",
    element: <HomePage />,
  },
  tasksList: {
    path: "/tasks",
    element: <TasksListPage />,
  },
  addTask: {
    path: "/tasks/add",
    element: <AddTaskPage />,
  },
  editTask: {
    path: "/tasks/edit/:taskId",
    element: <EditTaskPage />,
  },
};

const browserRouter = createBrowserRouter(Object.values(ROUTES));
export function AppRouter() {
  return <RouterProvider router={browserRouter} />;
}
