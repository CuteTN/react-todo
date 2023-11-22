import React from "react";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useTasks } from "../../common/stores";
import { TaskForm } from "./components/TaskForm.component";
import { Task } from "../../common/models/Task.model";
import { useParams } from "react-router-dom";
import { useAppNavigate } from "../../common/routers/navigate.hook";
import { Alert } from "../../common/components/Alert.component";
import { Paper } from "../../common/components/Paper.component";
import { capitalize } from "../../common/utils/string.utils";
import { Button } from "../../common/components/Button.component";
import { ArrowRightIcon } from "../../common/components/Icons.components";

export function EditTaskPage() {
  const { fm } = useAppI18n();
  const { taskId } = useParams();
  const [{ tasks }, { editTask }] = useTasks();
  const navigate = useAppNavigate();

  const task = React.useMemo(() => {
    return tasks.find((t) => t.id === taskId);
  }, [taskId, tasks]);

  const handleSubmitTask = React.useCallback(
    (task: Task) => {
      editTask({ taskId: task.id!, task });
    },
    [editTask]
  );

  const handleNavigateToTasksList = React.useCallback(() => {
    navigate("tasksList");
  }, [navigate]);

  return task ? (
    <TaskForm
      initialTask={task}
      header={`${fm("common.add")} ${fm("todo.todo")}`.toUpperCase()}
      onSubmit={handleSubmitTask}
    />
  ) : (
    <div className="flex justify-center">
      <Paper className="mt-52 w-3/5">
        <Alert
          title={`404 - ${capitalize(fm("common.msgItemNotFound", { item: fm("todo.task") }))}`}
          description={capitalize(fm("common.msgNoItemWithId", { item: fm("todo.task"), id: taskId })) + "."}
          severity="error"
        />

        <Button className="w-full" variant="contained" color="primary" endIcon={<ArrowRightIcon />} onClick={handleNavigateToTasksList}>
          {fm("common.goTo")} {fm("common.tasksList")}
        </Button>
      </Paper>
    </div>
  );
}
