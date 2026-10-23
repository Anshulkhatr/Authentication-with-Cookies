import Todo from "../models/todoModel.js"

const getAllTodos = async (req, res) => {

    const todo = await Todo.find()

    if (!todo) {
        res.status(403)
        throw new Error("Todos not found")
    }

    res.status(200).json(todo)

}

const getSingleTodo = async (req, res) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(403)
        throw new Error("Todo not found")
    }

    res.status(200).json(todo)

}

const createTodo = async (req, res) => {

    const { title, description, author } = req.body

    if (!title || !description || !author) {
        res.status(402)
        throw new Error("fill all details")
    }

    const todo = await Todo.create({ title, description, author })

    if (!todo) {
        res.status(401)
        throw new Error("Todo not create")
    }

    res.status(201).json(todo)

}

const updateTodo = async (req, res) => {

    const { id } = req.params

    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true })

    if (!todo) {
        res.status(404)
        throw new Error("Todo not Updated")
    }

    res.status(200).json(todo)

}

const deleteTodo = async (req, res) => {

    const todo = await Todo.findByIdAndDelete(req.params.id)

     res.status(200).json({
        id : todo._id,
        message : "Todo Deleted"
    })

}

const todoController = { getAllTodos, getSingleTodo, createTodo, updateTodo, deleteTodo }

export default todoController