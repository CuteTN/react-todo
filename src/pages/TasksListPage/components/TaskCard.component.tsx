import React from "react";
import { Fab } from "../../../common/components/Fab.component";
import { DeleteIcon, EditIcon, taskStatusIcons } from "../../../common/components/Icons.components";
import { Paper } from "../../../common/components/Paper.component";
import { Typography } from "../../../common/components/Typography.component";
import { useAppI18n } from "../../../common/i18n/I18nProvider.context";
import { Task } from "../../../common/models/Task.model";
import { capitalize } from "../../../common/utils/string.utils";
import { taskStatusNameGetters } from "../../../common/models/TaskStatus.model";
import { Tooltip } from "../../../common/components/Tooltip.component";

export function TaskCard({
  task,
  onDeleteTask,
  onEditTask,
}: {
  task: Task;
  onDeleteTask?: (task: Task) => any;
  onEditTask?: (task: Task) => any;
}) {
  const { fm } = useAppI18n();

  const handleDeleteTaskClick = React.useCallback(() => {
    onDeleteTask?.(task);
  }, [task, onDeleteTask]);

  const handleEditTaskClick = React.useCallback(() => {
    onEditTask?.(task);
  }, [task, onEditTask]);

  const renderStatusIcon = React.useCallback(() => {
    const Icon = taskStatusIcons[task.status];
    const statusName = taskStatusNameGetters[task.status](fm);
    return (
      <Tooltip title={capitalize(`${statusName} - ${task.progress}%`)} placement="top">
        <Icon color="primary" style={{ height: 40, width: 40 }} />
      </Tooltip>
    );
  }, [task.status, task.progress, fm]);

  return (
    <Paper className="mt-5 p-5 h-90 opacity-80 hover:opacity-95" style={{ boxShadow: 5 }}>
      <div className="flex mx-10">
        <div className="flex flex-1 items-center gap-2">
          {renderStatusIcon()}
          <Typography tooltip={task.name} variant="h4" ellipsis tooltipPlacement="top">
            {task.name}
          </Typography>
        </div>
        <div className="flex gap-2">
          <Fab tooltip={capitalize(fm("common.edit"))} size="small" color="info" onClick={handleEditTaskClick}>
            <EditIcon />
          </Fab>
          <Fab tooltip={capitalize(fm("common.delete"))} size="small" color="error" onClick={handleDeleteTaskClick}>
            <DeleteIcon />
          </Fab>
        </div>
      </div>
      <div className="mx-5 mt-2">
        <Typography tooltip={task.description} variant="body1" ellipsis tooltipPlacement="left">
          {task.description}
        </Typography>
      </div>
    </Paper>
  );
}
