const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');

// Apply middleware to all routes
router.use(authMiddleware);

// Route definitions
router.post('/', taskController.createTask); // Admin only
router.get('/', taskController.getTasks); // Admin only
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask); // Admin only

module.exports = router;
