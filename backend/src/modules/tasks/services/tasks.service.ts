import type { CreateTaskDto } from "../dtos/create-task.dto";
import type { UpdateTaskDto } from "../dtos/update-task.dto";
import type { ITaks } from "../interfaces/tasks.interface";
import { TaskModel } from "../models/tasks.model";

export class TaskService {

  async createTask(data: CreateTaskDto): Promise<ITaks> {
    const newTask = new TaskModel(data);

    return await newTask.save();
  }

  async getAllTasks(): Promise<ITaks[]> {
    return await TaskModel.find();
  }

  async getTaskById(id: string): Promise<ITaks | null> {

    if (!id) {
      return null;
    }
    return await TaskModel.findById(id);
  }

  async updateTask(id: string, data: UpdateTaskDto): Promise<ITaks | null> {

    return await TaskModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTask(id: string): Promise<ITaks | null> {

    return await TaskModel.findByIdAndDelete(id);
  }
}