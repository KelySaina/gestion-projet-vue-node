const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// Public routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// Protected routes
router.use(authMiddleware);
router.get('/', userController.getUsers); // Admin-only
router.get('/:id', userController.getUserById); // Admin-only
router.put('/:id', userController.updateUser); // Admin-only
router.delete('/:id', userController.deleteUser); // Admin-only

module.exports = router;
