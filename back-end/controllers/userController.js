const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create a new user (admin only)
exports.createUser = async (req, res) => {
  //if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const { name, lastname, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Authenticate user and return a token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get a user by ID (admin only)
exports.getUserById = async (req, res) => {
  //if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Update a user by ID (admin only)
exports.updateUser = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const { name, lastname, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (password) {
      user.password = bcrypt.hashSync(password, 10);
    }

    user.name = name || user.name;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Delete a user by ID (admin only)
exports.deleteUser = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    await user.destroy();
    res.json({ msg: 'User deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
