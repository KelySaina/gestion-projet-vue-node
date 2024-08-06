const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.send('Project Management API');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
