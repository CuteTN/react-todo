import { FormatMessageFunction } from "../i18n/messages/FormatMessage.model"

export enum ETaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  DONE = "DONE",
}

export const taskStatusNameGetters: { [key in ETaskStatus]: (fm: FormatMessageFunction) => string } = {
  DONE: fm => fm("todo.status.done"),
  IN_PROGRESS: fm => fm("todo.status.inProgress"),
  PENDING: fm => fm("todo.status.pending"),
  TODO: fm => fm("todo.status.todo"),
}