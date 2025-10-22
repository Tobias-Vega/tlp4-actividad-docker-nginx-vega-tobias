import { model, Schema } from "mongoose";
import type { ITaks } from "../interfaces/tasks.interface.js";
import { TasksStatus } from "../interfaces/tasks-status.enum.js";

const taskSchema = new Schema<ITaks>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: TasksStatus, default: TasksStatus.PENDING },
});

export const TaskModel = model<ITaks>("Task", taskSchema);