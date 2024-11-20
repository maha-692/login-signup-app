import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParkingSelection = () => {
  const [slots, setSlots] = useState([]);  // Define slots state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:5000/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setSlots(response.data); // Set the slots data fetched from the backend
      })
      .catch(error => {
        console.error('Error fetching slots:', error);
      });
    } else {
      alert('You must be logged in');
    }
  }, []);

  // Use slots in your component
  return (
    <div>
      <h1>Select a Parking Slot</h1>
      <ul>
        {slots.map((slot) => (
          <li key={slot._id}>
            Slot: {slot.name} - {slot.isBooked ? 'Booked' : 'Available'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParkingSelection;
