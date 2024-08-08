const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

// Create a new user (admin only)
exports.createUser = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const { name, lastname, email, password, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
      status: 'active' // Default to active status
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

    // Find user by email and ensure they are not deleted
    const user = await User.findOne({
      where: {
        email,
        status: { [Sequelize.Op.ne]: 'deleted' } // Exclude deleted users
      }
    });

    // Check if user exists and password is correct
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Compare provided password with stored hashed password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

    // Send token and user role in response
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Server error:', error); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const users = await User.findAll({
      where: { status: { [Sequelize.Op.ne]: 'deleted' } } // Exclude deleted users
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Get a user by ID (admin only)
exports.getUserById = async (req, res) => {
  //if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
        status: { [Sequelize.Op.ne]: 'deleted' } // Exclude deleted users
      }
    });
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
    const user = await User.findOne({
      where: {
        id: req.params.id,
        status: { [Sequelize.Op.ne]: 'deleted' } // Exclude deleted users
      }
    });

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

// Delete (mark as deleted) a user by ID (admin only)
exports.deleteUser = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });

  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
        status: { [Sequelize.Op.ne]: 'deleted' } // Exclude already deleted users
      }
    });

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Set status to "deleted" instead of actually deleting
    user.status = 'deleted';
    await user.save();

    res.json({ msg: 'User marked as deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
