import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        text: {type: String, required: [true, 'Please add a text value']},
        user: {type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'}
    },
    {
        timestamps: true
    }
)

export const Task = mongoose.model('Task', taskSchema)