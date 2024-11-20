import React, { useState } from 'react';
import './VisitorParking.css';

const VisitorSlotAvailability = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    purposeOfVisit: '', // Changed to 'purposeOfVisit' instead of 'department'
    arrivalTime: '',
    departureTime: '',
  });
  const [error, setError] = useState('');

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
      purposeOfVisit: '', // Reset the purposeOfVisit field
      arrivalTime: '',
      departureTime: '',
    });
  };

  const handleDownloadTicket = (ticket) => {
    const ticketText = `
      Slot: ${ticket.slot.slot} in ${ticket.slot.zone}
      Name: ${ticket.name}
      Purpose of Visit: ${ticket.purposeOfVisit}
      Arrival Time: ${ticket.arrivalTime}
      Departure Time: ${ticket.departureTime}
    `;
    const blob = new Blob([ticketText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Ticket_${ticket.slot.slot}_${ticket.name}.txt`;
    link.click();
  };

  return (
    <div className="visitor-slot-availability">
      <h1>Visitor Parking Slot Availability</h1>

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
            <input
              type="text"
              name="purposeOfVisit"
              placeholder="Purpose of visit"
              value={formData.purposeOfVisit}
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
            {error && <p className="error">{error}</p>}
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {ticketDetails.length > 0 && (
        <div className="ticket-display">
          <h3>Generated Tickets</h3>
          {ticketDetails.map((ticket, index) => (
            <div key={index} className="ticket">
              <p><strong>Slot:</strong> {ticket.slot.slot} in {ticket.slot.zone}</p>
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Purpose of Visit:</strong> {ticket.purposeOfVisit}</p>
              <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
              <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitorSlotAvailability;
