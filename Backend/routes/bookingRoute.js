const express = require('express');
const mongoose = require('mongoose');
const Room = require('../models/room');
const Booking = require('../models/booking');

const router = express.Router();

// Function to check if the room is available during the selected dates
const isRoomAvailable = async (roomNumber, startDate, endDate) => {
  const bookings = await Booking.find({
    roomNumber,
    $or: [
      { 'dates.startDate': { $lte: endDate }, 'dates.endDate': { $gte: startDate } },
    ],
  });

  return bookings.length === 0;
};

// Create a new booking
router.post('/newbooking', async (req, res) => {
  const { roomNumber, user, dates, totalCost, status } = req.body;
  const { startDate, endDate } = dates;

  console.log('Received booking request:', { roomNumber, user, startDate, endDate, totalCost, status });

  try {
    if (!roomNumber || !user || !dates || !totalCost) {
      console.error('Validation failed: missing fields');
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the room exists
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      console.error('Room not found:', roomNumber);
      return res.status(404).json({ message: 'Room not found.' });
    }

    // Check if the room is available during the selected dates
    const available = await isRoomAvailable(roomNumber, new Date(startDate), new Date(endDate));
    if (!available) {
      console.error('Room is already booked during the selected dates');
      return res.status(400).json({ message: 'Room is already booked during the selected dates. Please choose different dates or another room.' });
    }

    // Create a new booking
    const newBooking = new Booking({
      roomNumber,
      user, // Assuming this is the user ID
      dates: {
        startDate,
        endDate,
      },
      totalCost,
      status,
    });

    await newBooking.save();

    // Update the room status to 'booked'
    await Room.updateOne({ roomNumber }, { $set: { status: 'booked' } });

    console.log('Booking confirmed:', newBooking);

    res.status(201).json({
      message: 'Booking confirmed!',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// List all bookings
router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find();  // Populate user details if needed
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a booking by ID
router.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Find the associated room and set its status to 'vacant'
    await Room.updateOne({ roomNumber: booking.roomNumber }, { $set: { status: 'vacant' } });

    await Booking.findByIdAndDelete(id);

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/addbooking', async (req, res) => {
  try {
      const newBooking = new Booking(req.body);
      const savedBooking = await newBooking.save();

      // Add booking details to the room's currentBookings field
      await Room.updateOne(
          { _id: req.body.room },
          {
              $push: {
                  currentBookings: {
                      startDate: req.body.dates.startDate,
                      endDate: req.body.dates.endDate,
                      userId: req.body.user
                  }
              },
              $set: { status: 'booked' }
          } 
      );

      res.status(200).send(savedBooking);
  } catch (error) {
      res.status(400).send(error);
  }
});

module.exports = router;
