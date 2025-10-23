import { Router } from "express";
import { TaskService } from "../services/tasks.service";
import { TaskController } from "../controllers/tasks.controller";

const taskRouter = Router();

const taskServie = new TaskService();
const taskController = new TaskController(taskServie);

taskRouter.get("/", taskController.getAllTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.post("/", taskController.createTask);
taskRouter.patch("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);

export default taskRouter;