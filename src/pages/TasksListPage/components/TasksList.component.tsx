import React from "react";
import { Stack } from "../../../common/components/Stack.component";
import { Task } from "../../../common/models/Task.model";
import { TaskCard } from "./TaskCard.component";

export function TasksList({
  searchText,
  tasks,
  onDeleteTask,
  onEditTask,
}: {
  searchText: string;
  tasks: Task[];
  onDeleteTask?: (task: Task) => any;
  onEditTask?: (task: Task) => any;
}) {
  const taskRenderer = React.useCallback(
    (task: Task) => {
      return <TaskCard task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} />;
    },
    [onDeleteTask, onEditTask]
  );

  const filteredTasks = React.useMemo(() => {
    function isSatisfied(task: Task) {
      const lowerSearchText = searchText.toLowerCase();
      return task.name.toLowerCase().includes(lowerSearchText) || task.description.toLowerCase().includes(searchText);
    }

    return tasks.filter(isSatisfied);
  }, [searchText, tasks]);

  return <Stack items={filteredTasks} itemRenderer={taskRenderer} />;
}
