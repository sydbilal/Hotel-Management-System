const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    maxCount: {
        type: Number,
        required: true,
    },
    imageUrls: [],
    currentBookings:[],

    rentPerDay: {
        type: Number,
        required: true,
    },
    floor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor',
        required: true
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },
    services: [{
        type: String,
        enum: ['food', 'bath', 'snacks', 'drinks', ]
    }],
    utilities: [{
        type: String
    }],
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    ownerName: {
        type: String
    },
    status: {
        type: String,
        enum: ['booked', 'vacant', 'maintenance'],
        default: 'vacant'  // Default status is vacant
    },
    roomDescription: {
        type: String,
        required: true,
    },
}, {
    timestamps:true,
});

// Create a Room model based on the schema
const RoomModel = mongoose.model('rooms', roomSchema);

// Export the Room model
module.exports = RoomModel;
