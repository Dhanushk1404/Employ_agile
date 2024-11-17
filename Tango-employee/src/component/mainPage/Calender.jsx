import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

function Calender() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Select a Date:</h2>
      <div className="bg-white rounded-lg shadow-lg p-4">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="custom-calendar"
        />
      </div>
      <p className="mt-4 text-lg">Selected Date: <span className="font-bold">{date.toDateString()}</span></p>
    </div>
  );
}

export default Calender;

