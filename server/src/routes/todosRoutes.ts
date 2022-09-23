import { Router } from "express";
import { createTodo, getTodo, updateTodo, deleteTodo } from "../controllers/todosController";

const router = Router()

router.post('/todos', createTodo)
router.get('/todos', getTodo)
router.put('/todos/:id', updateTodo)
router.delete('/todos/:id', deleteTodo)

export default router