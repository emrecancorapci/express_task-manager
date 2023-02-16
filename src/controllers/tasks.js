import Task from '../models/Task.js';

export const getAllTasks = async (req, res) => {
  await Task.find({})
    .then((tasks) => {
      if (tasks) {
        return res.status(200).json({
          success: true,
          data: tasks,
        });
      }

      return res.status(404).json({
        success: false,
        error: 'No tasks found',
      });
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    });
};

export const getTask = async (req, res) => {
  await Task.findById(req.params.id)
    .then((task) => {
      if (task) {
        return res.status(200).json({
          success: true,
          data: task,
        });
      }

      return res.status(404).json({
        success: false,
        error: 'No task found',
      });
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    });
};

export const createTask = async (req, res) => {
  await Task.create(new Task({ ...req.body, createdAt: Date.now() }, { runValidators: true }))
    .then((task) => {
      if (!task) {
        return res.status(400).json({
          success: false,
          error: 'Task not created',
        });
      }

      return res.status(201).json({
        success: true,
        data: task,
      });
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    });
};

export const updateTask = async (req, res) => {
  await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then((task) => {
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
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    });
};

export const deleteTask = async (req, res) => {
  await Task.deleteOne({ _id: req.params.id })
    .then((task) => {
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
    })
    .catch((err) => {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: 'Server error',
      });
    });
};
