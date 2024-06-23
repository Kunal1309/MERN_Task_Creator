import express from "express";
import {getTasks, setTasks, updateTasks, deleteTasks} from "../Controller/taskController.js";

const router = express.Router();

router.get( '/', getTasks );

router.post('/', setTasks);

router.put('/:id', updateTasks);

router.delete('/:id', deleteTasks);

export default router;