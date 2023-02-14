import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 20 characters']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Title cannot be more than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('Task', TaskSchema);
