import type { Request, Response } from "express";
import type { TaskService } from "../services/tasks.service";
import type { CreateTaskDto } from "../dtos/create-task.dto";


export class TaskController {

  constructor(private taskService: TaskService){}

  createTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description, status }: CreateTaskDto = req.body;

      const task = await this.taskService
      .createTask({ title, description, status });

      return res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  getAllTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tasks = await this.taskService.getAllTasks();
      return res.status(200).json(tasks);
    } catch (error) {
      console.error('Error getting all products:', error);  
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  getTaskById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Task ID is required' });

      const task =  await this.taskService.getTaskById(id);

      if (!task) return  res.status(404).json({ message: 'Task not found' });
      
      return res.status(200).json(task);
    } catch (error) {
      console.error('Error getting task by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  updateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      if (!id) return res.status(400).json({ message: 'Task ID is required' });

      const updatedTaks = await this.taskService.updateTask(id, { title, description, status });

      if (!updatedTaks) return res.status(404).json({ message: 'Task not found' });

      return res.status(200).json(updatedTaks);
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ message: 'Internal server error' });  
    }
  }

  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Task ID is required' });

      const removed = await this.taskService.deleteTask(id);

      if (!removed) return res.status(404).json({ message: 'Task not found' });

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}