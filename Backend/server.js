const express = require('express');
const userRoutes = require('./routes/userRoute');
const roomsRoute = require('./routes/roomsRoute');
const mongoose = require('./db'); // Import the DB configuration
const bookingRoutes = require('./routes/bookingRoute');


const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
