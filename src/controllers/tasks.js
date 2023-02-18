import Task from '../models/Task.js';
import until from '../middleware/async-wrapper.js';
import { createApiError } from '../errors/api-error.js';

export const getAllTasks = async (req, res) => {
  const [error, tasks] = await until(Task.find({}));
  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  return res.status(200).json(tasks);
};

export const getTask = async (req, res, next) => {
  const { id } = req.params;
  const [error, task] = await until(Task.findById(id));

  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
      msg: error.message,
    });
  }

  if (!task) {
    return next(createApiError(`No task found with id: ${id}`, 404));
  }

  return res.status(200).json(task);
};

export const createTask = async (req, res) => {
  const [error, task] = await until(
    Task.create(
      new Task({ ...req.body, createdAt: Date.now() }, { runValidators: true })
    )
  );

  if (error) {
    console.log(err);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  if (!task) {
    return res.status(400).json({
      error: 'Task is not created',
    });
  }

  return res.status(201).json(task);
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const [error, task] = await until(
    Task.findOneAndUpdate({ _id: id }, req.body, {
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
    return next(createApiError(`No task found with id: ${id}`, 404));
  }

  return res.status(200).json({
    data: task,
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const [error, data] = await until(Task.deleteOne({ _id: id }));

  if (error) {
    console.log(error);

    return res.status(500).json({
      error: 'Server error',
    });
  }

  if (!data) {
    return next(createApiError(`No task found with id: ${id}`, 404));
  }

  return res.status(200).json({
    data: data,
  });
};
