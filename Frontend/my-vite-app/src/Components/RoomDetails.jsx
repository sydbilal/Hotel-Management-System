// RoomDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function RoomDetails() {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rooms/getallrooms`);
        const data = response.data.find(
          (room) => room.roomNumber === roomNumber
        );
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomNumber]);

  const handleBookNow = () => {
    navigate(`/booking/${roomNumber}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!room) return <p>No room found</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={room.imageUrls[0]}
          alt={room.roomName}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{room.roomName}</h2>
          <p className="text-gray-700 mb-1">Room Number: {room.roomNumber}</p>
          <p className="text-gray-700 mb-1">Max Count: {room.maxCount}</p>
          <p className="text-gray-700 mb-1">Rent Per Day: ${room.rentPerDay}</p>
          <p className="text-gray-700 mb-1">Status: {room.status}</p>
          <p className="text-gray-700 mb-1">Room Description: {room.roomDescription}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleBookNow}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
