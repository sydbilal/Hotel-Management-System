const express = require('express');
const userRoutes = require('./routes/userRoute');
const roomsRoute = require('./routes/roomsRoute');
const mongoose = require('./db'); // Import the DB configuration

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
