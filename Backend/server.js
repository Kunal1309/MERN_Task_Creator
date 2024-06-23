import express from "express";
import 'dotenv/config';
import taskRoutes from "./Routes/taskRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import errorHandler from "./Middleware/errorMiddleware.js";
import connectDB from "./connect/database.js";
import cors from 'cors';

const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/tasks', taskRoutes);

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));