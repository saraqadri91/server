import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: String,
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' }
});

export default mongoose.model('Task', taskSchema);
