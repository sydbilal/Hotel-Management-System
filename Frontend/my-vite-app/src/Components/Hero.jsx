// Hero.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Room from "./Room";
import { DatePicker } from "antd";
// import moment from "moment";

function Hero() {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromdate, setFromdate] = useState()
  const [todate, setTodate] = useState()

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

  function filterByDate(dates) {
    console.log((dates[0].format('DD-MM-YYYY')))
    console.log((dates[1].format('DD-MM-YYYY')))
    setFromdate(dates[0].format('DD-MM-YYYY'))
    setTodate(dates[1].format('DD-MM-YYYY'))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl mt-5 mb-5">
        Book your favourite room
      </h1>
      <div className="mb-5">
        <RangePicker
          format={dateFormat}
          onChange={filterByDate}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <Room key={room.roomNumber} room={room} fromdate={fromdate} todate={todate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hero;
