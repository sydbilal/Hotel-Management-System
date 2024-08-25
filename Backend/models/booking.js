const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    type: 'String',
    ref: 'User',
    required: true,
  },
  dates: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  totalCost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'canceled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

bookingSchema.index({ roomNumber: 1, 'dates.startDate': 1, 'dates.endDate': 1 });


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
