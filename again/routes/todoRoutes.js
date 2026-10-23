import express from 'express'
import todoController from '../controllers/todoController.js'

const router = express.Router()

router.get('/todo', todoController.getAllTodos)
router.get('/todo/:id', todoController.getSingleTodo)
router.post('/todo', todoController.createTodo)
router.put('/todo/:id', todoController.updateTodo)
router.delete('/todo/:id', todoController.deleteTodo)

export default router