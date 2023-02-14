import Task from '../models/Task.js';

export const getAllTasks = (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      return res.status(404).json({
        success: false,
        error: 'No tasks found',
      });
    }

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  });
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'No task found',
    });
  }

  return res.status(200).json({
    success: true,
    data: task,
  });
};

export const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  const task = new Task({
    title: title,
    description: description,
    completed: completed,
    createdAt: Date.now(),
  });
  
  Task.create(task, (err, task) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    return res.status(201).json({
      success: true,
      data: task,
    });
  });
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  return res.send(`Update item ${id}`);
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  Task.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        error: 'No task found',
      });
    }
  });

  return res.status(200).json({
    success: true,
  });
};
