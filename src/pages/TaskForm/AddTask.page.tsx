import React from "react";
import { useAppI18n } from "../../common/i18n/I18nProvider.context";
import { useTasks } from "../../common/stores";
import { TaskForm } from "./components/TaskForm.component";
import { Task } from "../../common/models/Task.model";

export function AddTaskPage() {
  const { fm } = useAppI18n();
  const [_, { addTask }] = useTasks();

  const handleSubmitTask = React.useCallback(
    (task: Task) => {
      addTask({ task });
    },
    [addTask]
  );
  return <TaskForm header={`${fm("common.add")} ${fm("todo.todo")}`.toUpperCase()} onSubmit={handleSubmitTask} />;
}
