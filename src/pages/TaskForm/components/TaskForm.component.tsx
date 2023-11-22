import React from "react";
import { Button } from "../../../common/components/Button.component";
import { Paper } from "../../../common/components/Paper.component";
import { Select } from "../../../common/components/Select.component";
import { Slider } from "../../../common/components/Slider.component";
import { TextField } from "../../../common/components/TextField.component";
import { Typography } from "../../../common/components/Typography.component";
import { Task } from "../../../common/models/Task.model";
import { ETaskStatus, taskStatusNameGetters } from "../../../common/models/TaskStatus.model";
import { FormatMessageFunction } from "../../../common/i18n/messages/FormatMessage.model";
import { useAppI18n } from "../../../common/i18n/I18nProvider.context";
import { capitalize } from "../../../common/utils/string.utils";
import { useAppNavigate } from "../../../common/routers/navigate.hook";
import { taskStatusIcons } from "../../../common/components/Icons.components";

type TaskStatusOption = {
  value: ETaskStatus;
};

const taskStatusOptions: TaskStatusOption[] = [
  { value: ETaskStatus.TODO },
  { value: ETaskStatus.IN_PROGRESS },
  { value: ETaskStatus.PENDING },
  { value: ETaskStatus.DONE },
];

function taskStatusOptionValueExtractor(option: TaskStatusOption) {
  return option.value;
}

export function TaskForm({
  header,
  initialTask,
  onSubmit,
}: {
  header: string;
  initialTask?: Task;
  onSubmit?: (task: Task) => any;
}) {
  const { fm } = useAppI18n();
  const navigate = useAppNavigate();
  const [task, setTask] = React.useState<Task>(
    () => initialTask ?? { name: "", description: "", progress: 0, status: ETaskStatus.TODO }
  );

  const formError = React.useMemo(() => {
    if (!task.name) return true;
  }, [task]);

  const handleChangeName = React.useCallback(
    (name: string) => {
      setTask((prev) => ({
        ...prev,
        name,
      }));
    },
    [setTask]
  );

  const handleChangeDescription = React.useCallback(
    (description: string) => {
      setTask((prev) => ({
        ...prev,
        description,
      }));
    },
    [setTask]
  );

  const handleChangeTaskStatus = React.useCallback(
    (status: ETaskStatus) => {
      setTask((prev) => ({
        ...prev,
        status,
      }));
    },
    [setTask]
  );

  const handleChangeProgress = React.useCallback(
    (progress: number) => {
      setTask((prev) => ({
        ...prev,
        progress,
      }));
    },
    [setTask]
  );

  const taskStatusOptionRenderer = React.useCallback(
    (option: TaskStatusOption) => {
      const Icon = taskStatusIcons[option.value];
      const nameGetter = taskStatusNameGetters[option.value];

      return (
        <div className="flex items-center">
          {<Icon />}
          <span className="ml-2">{capitalize(nameGetter(fm))}</span>
        </div>
      );
    },
    [fm]
  );

  React.useEffect(() => {
    if (task.status === ETaskStatus.DONE && task.progress !== 100) handleChangeProgress(100);
  }, [task.status, task.progress, handleChangeProgress]);

  const isProgressSliderDisabled = React.useMemo(() => {
    return task.status === ETaskStatus.DONE;
  }, [task.status]);

  const handleCancelClick = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleOkClick = React.useCallback(() => {
    onSubmit?.(task);
    navigate(-1);
  }, [navigate, onSubmit, task]);

  return (
    <div className="flex justify-center">
      <Paper className="flex justify-center mt-32 w-2/5 opacity-90 flex-wrap">
        <Typography variant="h4" className="underline pt-10">
          {header}
        </Typography>
        <div className="flex flex-wrap basis-full gap-5 mx-8 mt-8 mb-10">
          <TextField
            label={capitalize(fm("todo.form.name"))}
            className="basis-full"
            required
            value={task.name}
            onChange={handleChangeName}
          />
          <TextField
            label={fm("todo.form.description")}
            className="basis-full"
            value={task.description}
            onChange={handleChangeDescription}
          />
          <Select
            label={capitalize(fm("todo.form.status"))}
            wrapperClassName="basis-full"
            value={task.status}
            options={taskStatusOptions}
            itemRenderer={taskStatusOptionRenderer}
            valueExtractor={taskStatusOptionValueExtractor}
            onChange={handleChangeTaskStatus}
          />
          <Slider
            label={capitalize(fm("todo.form.progress"))}
            wrapperClassName="basis-full"
            value={task.progress}
            onChange={handleChangeProgress}
            disabled={isProgressSliderDisabled}
          />
        </div>
        <div className="flex w-full mr-10 mb-8 justify-end gap-5">
          <Button variant="contained" color="secondary" onClick={handleCancelClick}>
            {fm("common.cancel")}
          </Button>
          <Button variant="contained" disabled={formError} onClick={handleOkClick}>
            {capitalize(fm("common.ok"))}
          </Button>
        </div>
      </Paper>
    </div>
  );
}
