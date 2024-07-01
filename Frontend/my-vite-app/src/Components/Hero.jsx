// Hero.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";

function Hero() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        const data = response.data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="container mx-auto p-4">
            <h1 className="text-center text-2xl mt-5 mb-5">Book your favourite room</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <Room key={room.roomNumber} room={room} />
          ))}
        </div>
        
      )}
    </div>
  );
}

export default Hero;
