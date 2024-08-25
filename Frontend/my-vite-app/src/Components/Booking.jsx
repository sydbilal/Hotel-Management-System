import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DatePicker, Button, message } from 'antd';
import moment from 'moment';

const Booking = () => {
  const { roomNumber } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dates, setDates] = useState([null, null]);
  const [totalCost, setTotalCost] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rooms/getallrooms`);
        const data = response.data.find(room => room.roomNumber === roomNumber);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching room details.");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomNumber]);

  const handleDateChange = (dates) => {
    setDates(dates);
    if (dates[0] && dates[1]) {
      const start = moment(dates[0]);
      const end = moment(dates[1]);

      // Ensure that the end date is after the start date
      if (end.isBefore(start)) {
        setError("End date cannot be before start date.");
        setTotalCost(0);
        return;
      }

      const duration = end.diff(start, 'days') + 1; // Include both start and end days
      setTotalCost(room.rentPerDay * duration);
      setError("");
    } else {
      setTotalCost(0);
    }
  };

  const handleBooking = async () => {
    try {
      // Ensure dates are selected before proceeding
      if (!dates[0] || !dates[1]) {
        setError("Please select a date range.");
        return;
      }
  
      // Handle booking logic here, such as sending booking information to the backend
      const response = await axios.post('/api/bookings/newbooking', {
        roomNumber,
        user: "668294a9bf6108556e0df864",
        dates: { startDate: dates[0].toISOString(), endDate: dates[1].toISOString() },
        totalCost,
        status: 'confirmed'
      });
  
      message.success('Booking confirmed!');
      navigate('/'); // Navigate to a confirmation page or similar
    } catch (error) {
      console.error('Error during booking:', error);
      setError("Booking failed. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
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
          <p className="text-gray-700 mb-1">Rent Per Day: ${room.rentPerDay}</p>
          <p className="text-gray-700 mb-1">Status: {room.status}</p>
          <p className="text-gray-700 mb-1">Room Description: {room.roomDescription}</p>

          <div className="mb-4">
            <DatePicker.RangePicker
              format="DD/MM/YYYY"
              onChange={handleDateChange}
            />
          </div>

          <p className="text-gray-700 mb-1">Total Cost: ${totalCost}</p>

          <Button
            type="primary"
            className="mt-4"
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
