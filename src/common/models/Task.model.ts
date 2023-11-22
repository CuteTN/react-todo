import { ETaskStatus } from "./TaskStatus.model";

export type Task = {
  id?: string;
  name: string;
  description: string;
  progress: number;
  status: ETaskStatus;
}