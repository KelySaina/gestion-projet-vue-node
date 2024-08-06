const { Task, User } = require('../models');

// Create a new task (admin only)
exports.createTask = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const { name, description, status, Pid_person } = req.body;

    const task = await Task.create({
      name,
      description,
      status,
      Pid_person
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get all tasks (admin only)
exports.getTasks = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check if the user is an admin or the task is assigned to the user
    if (req.user.role === 'user' && task.Pid_person !== req.user.id) {
      return res.status(403).json({ msg: task.Pid_person });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { name, description, status, Pid_person } = req.body;
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check if the user is an admin or the task is assigned to the user
    if (req.user.role === 'user' && task.Pid_person !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    task.name = name || task.name;
    task.description = description || task.description;
    task.status = status || task.status;
    task.Pid_person = Pid_person || task.Pid_person;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Delete a task by ID (admin only)
exports.deleteTask = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await task.destroy();
    res.json({ msg: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
