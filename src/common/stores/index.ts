import { configureStore } from "@reduxjs/toolkit"
import { tasksSlice, tasksReducer } from "./slices/tasks.slice"
import { createHookFromSlice } from "./redux.utils"

export const reduxStore = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})

export const useTasks = createHookFromSlice(tasksSlice, state => state.tasks)