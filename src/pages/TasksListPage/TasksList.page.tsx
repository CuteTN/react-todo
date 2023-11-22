import React from "react";
import { TextField } from "../../common/components/TextField.component";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useTasks } from "../../common/stores";
import { TasksList } from "./components/TasksList.component";
import { Fab } from "../../common/components/Fab.component";
import AddIcon from "@mui/icons-material/Add";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { capitalize } from "../../common/utils/string.utils";
import { Task } from "../../common/models/Task.model";

export function TasksListPage() {
  const { fm } = useAppI18n();
  const [tasksState, { removeTask }] = useTasks();
  const navigate = useAppNavigate();
  const [searchText, setSearchText] = React.useState("");

  const handleRemoveTask = React.useCallback(
    (task: Task) => {
      removeTask({ taskId: task.id! });
    },
    [removeTask]
  );

  const handleNavigateToAddTask = React.useCallback(() => {
    navigate("addTask");
  }, [navigate]);

  const handleNavigateToEditTask = React.useCallback(
    (task: Task) => {
      navigate("editTask", { params: { taskId: task.id! } });
    },
    [navigate]
  );

  return (
    <div className="flex justify-center">
      <div className="mt-5 w-2/5">
        <TextField
          className="w-full"
          label={capitalize(fm("common.search"))}
          value={searchText}
          onChange={setSearchText}
        />
        <TasksList tasks={tasksState.tasks} onDeleteTask={handleRemoveTask} onEditTask={handleNavigateToEditTask} searchText={searchText} />
        <Fab
          tooltip={capitalize(`${fm("common.add")} ${fm("todo.todo")}`)}
          style={{ position: "fixed", bottom: 64, right: 64 }}
          color="primary"
          size="large"
          onClick={handleNavigateToAddTask}
        >
          <AddIcon className="w-10" />
        </Fab>
      </div>
    </div>
  );
}
