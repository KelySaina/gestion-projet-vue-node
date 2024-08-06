const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.header('X-Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) return res.status(404).json({ msg: 'User not found' });
    req.user.role = decoded.role; // Attach the role from the token
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
