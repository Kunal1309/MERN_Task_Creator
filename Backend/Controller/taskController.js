import expressAsyncHandler from "express-async-handler";
import { Task } from "../Models/taskModel.js";

const getTasks = expressAsyncHandler (async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
})

const setTasks = expressAsyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter task')
    }
    const task = await Task.create({text: req.body.text})
    res.status(200).json(task);
})

const updateTasks = expressAsyncHandler (async (req, res) => {
    const task = await Task.findById(req.params.id)

    if(!task) {
        res.status(400)
        throw new Error('Task not Found')
    }
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updateTask);
})

const deleteTasks = expressAsyncHandler (async (req, res) => {
    
    const task = await Task.findById(req.params.id);

    if(!task) {
        res.status(400)
        throw new Error('Task not Found')
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({message: `Task Deleted. id: ${req.params.id}`});
})

export {getTasks, setTasks, updateTasks, deleteTasks};