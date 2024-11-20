import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import './AmbulanceSlotAvailability.css';

const AmbulanceSlotAvailability = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    arrivalTime: '',
    departureTime: '',
  });
  const [error, setError] = useState('');

  // Define Ambulance parking zones and slots
  const zones = {
    'Zone 1': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 2': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 3': ['Slot 1', 'Slot 2', 'Slot 3'],
  };

  const handleSlotClick = (zone, slot) => {
    setSelectedSlot({ zone, slot });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const arrival = new Date(formData.arrivalTime);
    const departure = new Date(formData.departureTime);

    if (departure <= arrival) {
      setError('Departure time must be after arrival time.');
      return;
    } else {
      setError('');
    }

    const newTicket = { ...formData, slot: selectedSlot };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: '',
      department: '',
      arrivalTime: '',
      departureTime: '',
    });
  };

  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text(`Ambulance Parking Ticket`, 10, 10);
    doc.text(`Slot: ${ticket.slot.slot}`, 10, 20);
    doc.text(`Zone: ${ticket.slot.zone}`, 10, 30);
    doc.text(`Name: ${ticket.name}`, 10, 40);
    doc.text(`Department: ${ticket.department}`, 10, 50);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 60);
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 70);
    doc.save(`ambulance-ticket-${ticket.slot.zone}-${ticket.slot.slot}.pdf`);
  };

  return (
    <div className="ambulance-slot-availability">
      <h1>Ambulance Parking Slot Availability</h1>

      {Object.keys(zones).map((zone) => (
        <div key={zone} className="zone">
          <h2>{zone}</h2>
          <div className="slots">
            {zones[zone].map((slot, index) => {
              const isBooked = ticketDetails.some(
                (ticket) => ticket.slot.zone === zone && ticket.slot.slot === slot
              );
              return (
                <div
                  key={index}
                  className={`slot ${isBooked ? 'booked' : 'available'}`}
                  onClick={() => !isBooked && handleSlotClick(zone, slot)}
                >
                  {slot} {isBooked && '(Booked)'}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {selectedSlot && (
        <div className="booking-form">
          <h3>Book {selectedSlot.slot} in {selectedSlot.zone}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Emergency">Medical</option>
              <option value="Radiology">Fire</option>
              <option value="ICU">Rescue</option>

            </select>
            <input
              type="datetime-local"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {ticketDetails.length > 0 && (
        <div className="ticket-display">
          <div className="ticket-header">
            <h3>Generated Tickets</h3>
          </div>
          <div className="ticket-details">
            {ticketDetails.map((ticket, index) => (
              <div key={index} className="ticket">
                <p><strong>Slot:</strong> {ticket.slot.slot} in {ticket.slot.zone}</p>
                <p><strong>Name:</strong> {ticket.name}</p>
                <p><strong>Department:</strong> {ticket.department}</p>
                <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
                <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
                <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbulanceSlotAvailability;
