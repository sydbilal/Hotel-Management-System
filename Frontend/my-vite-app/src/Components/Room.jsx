// Room.jsx
import React from "react";
import { Link } from "react-router-dom";

function Room({ room }) {
  return (
    <Link to={`/room/${room.roomNumber}`} key={room.roomNumber}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={room.imageUrls[0]}
          alt={room.roomName}
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{room.roomName}</h2>
          <p className="text-gray-600">{room.roomDescription}</p>
          <p className="text-gray-800 font-semibold">Max Count: {room.maxCount}</p>
          <p className="text-gray-800 font-semibold">Rent per Day: ${room.rentPerDay}</p>
          <p className="text-gray-800 font-semibold">Status: {room.status}</p>
          <div className="mt-2">
            <span className="text-gray-600">Services: </span>
            {room.services.map((service) => (
              <span
                key={service}
                className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-semibold mr-2"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Room;
