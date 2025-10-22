import type { CreateTaskDto } from "./create-task.dto.js";

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}