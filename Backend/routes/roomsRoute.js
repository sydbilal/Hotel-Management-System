const express = require("express");

const router = express.Router()
const Room = require('../models/room')

// Get all rooms
router.get('/getallrooms', async (req, res) => {

    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({message: error})
    }
})

// Create a room
router.post('/addroom', async (req, res) => {
    try {
      const newRoom = new Room(req.body);
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

  // Edit a room
router.put('/rooms/:id', async (req, res) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

  // Delete a room
router.delete('/rooms/:id', async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(204).json({ message: "Room deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router