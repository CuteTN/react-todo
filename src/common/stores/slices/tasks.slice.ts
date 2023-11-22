import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../models/Task.model";
import { ReduxAction } from "../redux.models";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [] as Task[],
  },
  reducers: {
    addTask(state, action: ReduxAction<{ task: Task }>) {
      const { task } = action.payload;
      if (!task.id) task.id = crypto.randomUUID();
      state.tasks.push(task);
    },
    editTask(state, action: ReduxAction<{ taskId: string; task: Partial<Task> }>) {
      const { task, taskId } = action.payload;
      state.tasks = state.tasks.map((oldTask) =>
        oldTask.id === taskId ? { ...oldTask, ...task, id: taskId } : oldTask
      );
    },
    removeTask(state, action: ReduxAction<{ taskId: string }>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.taskId);
    },
  },
});

export const tasksReducer = tasksSlice.reducer;