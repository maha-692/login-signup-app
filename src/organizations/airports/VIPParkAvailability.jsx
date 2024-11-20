import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './SlotsAirport.css';

function VIPParkAvailability() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    vipName: '',
    vipId: '',
    arrivalTime: '',
    departureTime: '',
  });

  // Zones with parking slots
  const zones = {
    'Zone 1': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 2': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 3': ['Slot 1', 'Slot 2', 'Slot 3'],
  };

  // Handle slot click
  const handleSlotClick = (zone, slot) => {
    setSelectedSlot(`${zone} ${slot}`);
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert arrival and departure times to Date objects
    const arrival = new Date(formData.arrivalTime);
    const departure = new Date(formData.departureTime);

    // Check if departure time is after arrival time
    if (departure <= arrival) {
      alert('Departure time must be after arrival time.');
      return;
    }

    const newTicket = { ...formData, slot: selectedSlot };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      vipName: '',
      vipId: '',
      arrivalTime: '',
      departureTime: '',
    });
  };

  // Generate PDF ticket
  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text('VIP Parking Ticket', 10, 10);
    doc.text(`Slot: ${ticket.slot}`, 10, 20);
    doc.text(`VIP Name: ${ticket.vipName}`, 10, 30);
    doc.text(`VIP ID: ${ticket.vipId}`, 10, 40);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 50);
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 60);
    doc.save(`vip-ticket-${ticket.slot}.pdf`);
  };

  return (
    <div className="parking-availability">
      <h1>VIP Parking Availability</h1>

      {Object.keys(zones).map((zone) => (
        <div key={zone} className="zone">
          <h2>{zone}</h2>
          <div className="slots">
            {zones[zone].map((slot, index) => (
              <div
                key={index}
                className={`slot ${
                  ticketDetails.find((ticket) => ticket.slot === `${zone} ${slot}`) ? 'booked' : 'available'
                }`}
                onClick={() =>
                  !ticketDetails.find((ticket) => ticket.slot === `${zone} ${slot}`) &&
                  handleSlotClick(zone, slot)
                }
              >
                {slot} {ticketDetails.find((ticket) => ticket.slot === `${zone} ${slot}`) && '(Booked)'}
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedSlot && (
        <div className="booking-form">
          <h3>Book {selectedSlot}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="vipName"
              placeholder="Enter VIP name"
              value={formData.vipName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="vipId"
              placeholder="Enter VIP ID"
              value={formData.vipId}
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
              <p><strong>VIP Name:</strong> {ticket.vipName}</p>
              <p><strong>VIP ID:</strong> {ticket.vipId}</p>
              <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
              <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VIPParkAvailability;
