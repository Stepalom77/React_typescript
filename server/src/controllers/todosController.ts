import { RequestHandler } from "express"
import { Todo } from "../models/todos"

const TODOS:Todo[] =[]

export const createTodo:RequestHandler = (req, res) => {
    const {text} = req.body as {text:string}
    let newTodo = null
    try{
        newTodo = new Todo(Math.random().toString(), text)
        TODOS.push(newTodo)
    }catch(err){
        console.error(err)
        return res.status(400).json({message: 'There was an error'})
    }
    return res.status(201).json({createdTodo: newTodo})
}

export const getTodo:RequestHandler = (req, res) => {
    let allTodos = null
    try{
        allTodos = res.json({todos:TODOS})
    }catch(err){
        console.error(err)
        return res.status(400).json({message:"There was an error"})
    }
    return allTodos
}

export const updateTodo:RequestHandler<{id:string}> = (req, res) => {
    const idTodo = req.params.id
    let {text} = req.body as {text:string}
    const updatedTodo = text
    let todoIndex = null
    try{
        todoIndex = TODOS.findIndex(todo => todo.id === idTodo)
        TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedTodo)
    }catch(err){
        console.error(err)
        if(!idTodo){
            return res.status(404).json({message: 'The todo that you want to update does not exist'})
        }else {
            return res.status(400).json({message: 'There was an error'})
        }
    }
    return res.status(200).json(TODOS[todoIndex])
}

export const deleteTodo:RequestHandler = (req, res) => {
    const idTodo = req.params.id
    let todoIndex = null
    try{
        todoIndex = TODOS.findIndex(todo => todo.id === idTodo)
        TODOS.splice(todoIndex, 1)
    }catch(err){
        console.error(err)
        if(!idTodo){
            return res.status(404).json({message: 'The todo you want to delete does not exist'})
        }else {
            return res.status(400).json({message: 'There was an error'})
        }
    }
    return res.status(204).json(TODOS[todoIndex])
}

