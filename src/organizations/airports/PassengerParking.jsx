import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './PassengerParking.css'; // Ensure this file path is correct

function PassengerParking() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    vehicleType: '',
    plateNumber: '',
    arrivalTime: '',
    departureTime: '',
    bookingDuration: '',
  });
  const [error, setError] = useState('');

  const zones = {
    'Zone 1': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 2': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 3': ['Slot 1', 'Slot 2', 'Slot 3'],
  };

  const handleSlotClick = (zone, slot) => {
    setSelectedSlot(`${zone} ${slot}`);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { arrivalTime, departureTime } = formData;

    if (new Date(departureTime) <= new Date(arrivalTime)) {
      setError('Departure time must be later than arrival time.');
      return;
    }

    const newTicket = { ...formData, slot: selectedSlot };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: '',
      vehicleType: '',
      plateNumber: '',
      arrivalTime: '',
      departureTime: '',
      bookingDuration: '',
    });
    setError('');
  };

  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text('Parking Ticket', 10, 10);
    doc.text(`Slot: ${ticket.slot}`, 10, 20);
    doc.text(`Name: ${ticket.name}`, 10, 30);
    doc.text(`Vehicle Type: ${ticket.vehicleType}`, 10, 40);
    doc.text(`Plate Number: ${ticket.plateNumber}`, 10, 50);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 60);
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 70);
    doc.text(`Booking Duration: ${ticket.bookingDuration}`, 10, 80);
    const sanitizedSlot = ticket.slot.replace(' ', '_');
    doc.save(`ticket_${sanitizedSlot}.pdf`);
  };

  return (
    <div className="passenger-parking">
      <h1>Passenger Parking Availability</h1>

      {Object.keys(zones).map((zone) => (
        <div key={zone} className="zone">
          <h2>{zone}</h2>
          <div className="slots">
            {zones[zone].map((slot, index) => (
              <div
                key={index}
                className={`slot ${
                  ticketDetails.find(ticket => ticket.slot === `${zone} ${slot}`) ? 'booked' : 'available'
                } ${selectedSlot === `${zone} ${slot}` ? 'selected' : ''}`}
                onClick={() =>
                  !ticketDetails.find(ticket => ticket.slot === `${zone} ${slot}`) && handleSlotClick(zone, slot)
                }
              >
                {slot} {ticketDetails.find(ticket => ticket.slot === `${zone} ${slot}`) && '(Booked)'}
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedSlot && (
        <div className="booking-form">
          <h3>Book {selectedSlot}</h3>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="vehicleType"
              placeholder="Enter vehicle type"
              value={formData.vehicleType}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="plateNumber"
              placeholder="Enter plate number"
              value={formData.plateNumber}
              onChange={handleChange}
              required
            />
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
            <select
              name="bookingDuration"
              value={formData.bookingDuration}
              onChange={handleChange}
              required
            >
              <option value="">Select Booking Duration</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {ticketDetails.length > 0 && (
        <div className="ticket-display">
          <h2>Generated Tickets</h2>
          {ticketDetails.map((ticket, index) => (
            <div key={index} className="ticket">
              <p><strong>Slot:</strong> {ticket.slot}</p>
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Vehicle Type:</strong> {ticket.vehicleType}</p>
              <p><strong>Plate Number:</strong> {ticket.plateNumber}</p>
              <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
              <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
              <p><strong>Booking Duration:</strong> {ticket.bookingDuration}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PassengerParking;
