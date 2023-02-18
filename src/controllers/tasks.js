import Task from '../models/Task.js';
import until from '../middleware/async-wrapper.js';

export const getAllTasks = async (req, res) => {
  const [error, tasks] = await until(Task.find({}));
  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  return res.status(200).json({
    data: tasks,
  });
};

export const getTask = async (req, res) => {
  const [error, task] = await until(Task.findById(req.params.id));
  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  if (!task) {
    return res.status(404).json({
      error: 'No task found',
    });
  }

  return res.status(200).json({
    data: task,
  });
};

export const createTask = async (req, res) => {
  const [error, task] = await until(
    Task.create(new Task({ ...req.body, createdAt: Date.now() }))
  );

  if (error) {
    console.log(err);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  if (!task) {
    return res.status(400).json({
      error: 'Task not created',
    });
  }

  return res.status(201).json({
    data: task,
  });
};

export const updateTask = async (req, res) => {
  const [error, task] = await until(
    Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
  );

  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  if (!task) {
    return res.status(404).json({
      error: 'No task found',
    });
  }

  return res.status(200).json({
    data: task,
  });
};

export const deleteTask = async (req, res) => {
  const [error, data] = await until(Task.deleteOne({ _id: req.params.id }));

  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  if (!data) {
    return res.status(404).json({
      error: 'No task found',
    });
  }

  return res.status(200).json({
    data: data,
  });
};
